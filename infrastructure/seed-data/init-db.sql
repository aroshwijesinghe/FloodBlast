-- ============================================================================
-- FloodBlast Database Initialization Script
-- PostgreSQL 16 + PostGIS 3.4
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Trigram index for text search

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE user_type AS ENUM ('BASIC', 'REGISTERED', 'TRUSTED', 'ADMIN');
CREATE TYPE trusted_role AS ENUM (
  'POLICE_OFFICER', 'GRAMA_NILADHARI', 'DIVISIONAL_SECRETARY',
  'DISTRICT_SECRETARY', 'DISASTER_RELIEF_OFFICER', 'MEDICAL_OFFICER_HEALTH',
  'MILITARY_OFFICER', 'RED_CROSS_VOLUNTEER', 'CIVIL_DEFENCE', 'IRRIGATION_OFFICER'
);
CREATE TYPE incident_category AS ENUM (
  'FLOOD', 'LANDSLIDE', 'ROAD_BROKEN', 'ROAD_BLOCKED',
  'BRIDGE_DAMAGED', 'BRIDGE_COLLAPSED'
);
CREATE TYPE incident_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE incident_status AS ENUM ('UNVERIFIED', 'VERIFIED', 'DISPUTED', 'CLOSED', 'DISMISSED');
CREATE TYPE verification_vote AS ENUM ('CONFIRM', 'DENY');
CREATE TYPE ticket_status AS ENUM ('OPEN', 'VERIFIED', 'CLOSING_REQUESTED', 'CLOSED', 'AUTO_EXPIRED', 'DISMISSED');
CREATE TYPE media_type AS ENUM ('IMAGE', 'VOICE', 'VIDEO');
CREATE TYPE upload_priority AS ENUM ('CRITICAL_1', 'HIGH_2', 'MEDIUM_3', 'LOW_4');
CREATE TYPE upload_status AS ENUM ('PENDING', 'UPLOADING', 'COMPLETE', 'FAILED');
CREATE TYPE relief_request_type AS ENUM ('FOOD', 'MEDICAL', 'CLOTHING', 'SHELTER', 'OTHER');
CREATE TYPE meal_type AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER');
CREATE TYPE relief_request_status AS ENUM ('OPEN', 'PARTIALLY_FILLED', 'FULFILLED', 'CLOSED');
CREATE TYPE donation_status AS ENUM ('PLEDGED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');
CREATE TYPE victim_status AS ENUM ('STRANDED', 'EVACUATED', 'AT_SAFE_PLACE', 'MISSING');
CREATE TYPE safe_place_status AS ENUM ('ACTIVE', 'FULL', 'CLOSED');
CREATE TYPE safe_place_verification AS ENUM ('UNVERIFIED', 'VERIFIED');
CREATE TYPE officer_type AS ENUM (
  'GRAMA_NILADHARI', 'DIVISIONAL_SECRETARY', 'POLICE',
  'MEDICAL_OFFICER_HEALTH', 'DISASTER_RELIEF_OFFICER',
  'MILITARY', 'FIRE_RESCUE', 'AMBULANCE'
);
CREATE TYPE admin_boundary_level AS ENUM ('PROVINCE', 'DISTRICT', 'DS_DIVISION', 'GN_DIVISION');

-- ============================================================================
-- TABLES
-- ============================================================================

-- ─── Users ──────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_type user_type NOT NULL DEFAULT 'BASIC',
  name VARCHAR(255),
  phone VARCHAR(20),
  nic_number VARCHAR(20),
  trusted_role trusted_role,
  trusted_badge_id VARCHAR(100),
  device_id VARCHAR(255),
  last_known_location GEOMETRY(Point, 4326),
  reputation_score FLOAT DEFAULT 0.0,
  is_active BOOLEAN DEFAULT TRUE,
  is_trusted_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_device_id ON users(device_id);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_location ON users USING GIST(last_known_location);

-- ─── Tickets (Master container for disaster events) ─────────────────────────────
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category incident_category NOT NULL,
  status ticket_status NOT NULL DEFAULT 'OPEN',
  centroid GEOMETRY(Point, 4326),
  area GEOMETRY(Polygon, 4326),
  district VARCHAR(100),
  ds_division VARCHAR(200),
  gn_division VARCHAR(200),
  total_affected_persons INT DEFAULT 0,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  auto_expire_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_category ON tickets(category);
CREATE INDEX idx_tickets_centroid ON tickets USING GIST(centroid);
CREATE INDEX idx_tickets_area ON tickets USING GIST(area);
CREATE INDEX idx_tickets_auto_expire ON tickets(auto_expire_at) WHERE auto_expire_at IS NOT NULL;

-- ─── Incidents ──────────────────────────────────────────────────────────────────
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES users(id),
  ticket_id UUID REFERENCES tickets(id),
  category incident_category NOT NULL,
  sub_type VARCHAR(50),
  severity incident_severity NOT NULL DEFAULT 'MEDIUM',
  status incident_status NOT NULL DEFAULT 'UNVERIFIED',
  location GEOMETRY(Point, 4326) NOT NULL,
  affected_area GEOMETRY(Polygon, 4326),
  description TEXT NOT NULL,
  voice_transcript TEXT,
  confidence_score FLOAT DEFAULT 0.0,
  gn_division VARCHAR(200),
  ds_division VARCHAR(200),
  district VARCHAR(100),
  reporter_phone VARCHAR(20),
  expose_contact BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_incidents_location ON incidents USING GIST(location);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_category ON incidents(category);
CREATE INDEX idx_incidents_ticket ON incidents(ticket_id);
CREATE INDEX idx_incidents_reporter ON incidents(reporter_id);
CREATE INDEX idx_incidents_created ON incidents(created_at DESC);
CREATE INDEX idx_incidents_district ON incidents(district);

-- ─── Incident Media ─────────────────────────────────────────────────────────────
CREATE TABLE incident_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  media_type media_type NOT NULL,
  priority upload_priority NOT NULL DEFAULT 'MEDIUM_3',
  storage_url TEXT,
  thumbnail_url TEXT,
  upload_status upload_status NOT NULL DEFAULT 'PENDING',
  file_size_bytes INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_incident_media_incident ON incident_media(incident_id);
CREATE INDEX idx_incident_media_status ON incident_media(upload_status);

-- ─── Verifications ──────────────────────────────────────────────────────────────
CREATE TABLE verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  vote verification_vote NOT NULL,
  voter_location GEOMETRY(Point, 4326) NOT NULL,
  distance_to_incident FLOAT NOT NULL,
  voter_weight FLOAT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(incident_id, user_id) -- One vote per user per incident
);

CREATE INDEX idx_verifications_incident ON verifications(incident_id);
CREATE INDEX idx_verifications_user ON verifications(user_id);

-- ─── Victim Reports ─────────────────────────────────────────────────────────────
CREATE TABLE victim_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES users(id),
  pregnant_count INT DEFAULT 0,
  medical_wounded_count INT DEFAULT 0,
  elderly_count INT DEFAULT 0,
  disabled_count INT DEFAULT 0,
  children_count INT DEFAULT 0,
  total_persons INT DEFAULT 0,
  special_notes TEXT,
  victim_status victim_status DEFAULT 'STRANDED',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_victim_reports_incident ON victim_reports(incident_id);

-- ─── Relief Requests ────────────────────────────────────────────────────────────
CREATE TABLE relief_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id),
  requester_id UUID NOT NULL REFERENCES users(id),
  request_type relief_request_type NOT NULL,
  quantity_needed INT NOT NULL,
  quantity_fulfilled INT DEFAULT 0,
  meal_type meal_type,
  status relief_request_status NOT NULL DEFAULT 'OPEN',
  description TEXT,
  delivery_location GEOMETRY(Point, 4326),
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_relief_requests_ticket ON relief_requests(ticket_id);
CREATE INDEX idx_relief_requests_status ON relief_requests(status);
CREATE INDEX idx_relief_requests_type ON relief_requests(request_type);

-- ─── Donations ──────────────────────────────────────────────────────────────────
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  relief_request_id UUID NOT NULL REFERENCES relief_requests(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES users(id),
  quantity_pledged INT NOT NULL,
  status donation_status NOT NULL DEFAULT 'PLEDGED',
  pledged_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

CREATE INDEX idx_donations_request ON donations(relief_request_id);
CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_donations_status ON donations(status);

-- ─── Safe Places ────────────────────────────────────────────────────────────────
CREATE TABLE safe_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id),
  added_by UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  location GEOMETRY(Point, 4326) NOT NULL,
  address TEXT,
  capacity INT DEFAULT 0,
  current_occupancy INT DEFAULT 0,
  facilities_description TEXT,
  status safe_place_status NOT NULL DEFAULT 'ACTIVE',
  verification_status safe_place_verification DEFAULT 'UNVERIFIED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_safe_places_location ON safe_places USING GIST(location);
CREATE INDEX idx_safe_places_ticket ON safe_places(ticket_id);
CREATE INDEX idx_safe_places_status ON safe_places(status);

-- ─── Safe Place Media ───────────────────────────────────────────────────────────
CREATE TABLE safe_place_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  safe_place_id UUID NOT NULL REFERENCES safe_places(id) ON DELETE CASCADE,
  media_type media_type NOT NULL,
  storage_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_safe_place_media_place ON safe_place_media(safe_place_id);

-- ─── Emergency Contacts ─────────────────────────────────────────────────────────
CREATE TABLE emergency_contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  officer_name VARCHAR(255),
  officer_title VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  secondary_phone VARCHAR(20),
  officer_type officer_type NOT NULL,
  gn_division VARCHAR(200),
  ds_division VARCHAR(200),
  district VARCHAR(100),
  office_location GEOMETRY(Point, 4326),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_emergency_contacts_district ON emergency_contacts(district);
CREATE INDEX idx_emergency_contacts_ds ON emergency_contacts(ds_division);
CREATE INDEX idx_emergency_contacts_gn ON emergency_contacts(gn_division);
CREATE INDEX idx_emergency_contacts_type ON emergency_contacts(officer_type);
CREATE INDEX idx_emergency_contacts_location ON emergency_contacts USING GIST(office_location);

-- ─── Sri Lanka Administrative Boundaries ────────────────────────────────────────
CREATE TABLE admin_boundaries (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  name_si VARCHAR(255),
  name_ta VARCHAR(255),
  level admin_boundary_level NOT NULL,
  parent_code VARCHAR(20),
  boundary GEOMETRY(MultiPolygon, 4326),
  centroid GEOMETRY(Point, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_boundaries_level ON admin_boundaries(level);
CREATE INDEX idx_admin_boundaries_parent ON admin_boundaries(parent_code);
CREATE INDEX idx_admin_boundaries_boundary ON admin_boundaries USING GIST(boundary);
CREATE INDEX idx_admin_boundaries_centroid ON admin_boundaries USING GIST(centroid);

-- ─── Ticket Closure Votes ───────────────────────────────────────────────────────
CREATE TABLE ticket_closure_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  vote verification_vote NOT NULL, -- CONFIRM = agree to close, DENY = keep open
  voter_location GEOMETRY(Point, 4326) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ticket_id, user_id) -- One closure vote per user per ticket
);

CREATE INDEX idx_closure_votes_ticket ON ticket_closure_votes(ticket_id);

-- ─── Activity Log (Timeline for project dashboard) ──────────────────────────────
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID REFERENCES tickets(id) ON DELETE CASCADE,
  incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_ticket ON activity_log(ticket_id);
CREATE INDEX idx_activity_log_incident ON activity_log(incident_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_relief_requests_updated_at BEFORE UPDATE ON relief_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_safe_places_updated_at BEFORE UPDATE ON safe_places
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON emergency_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Function: Resolve GPS point to administrative division
-- Returns the GN Division, DS Division, and District for a given point
-- ============================================================================
CREATE OR REPLACE FUNCTION resolve_admin_location(
  p_point GEOMETRY(Point, 4326)
)
RETURNS TABLE(
  gn_division VARCHAR,
  ds_division VARCHAR,
  district VARCHAR,
  province VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    gn.name_en AS gn_division,
    ds.name_en AS ds_division,
    dist.name_en AS district,
    prov.name_en AS province
  FROM admin_boundaries gn
  LEFT JOIN admin_boundaries ds ON ds.code = gn.parent_code AND ds.level = 'DS_DIVISION'
  LEFT JOIN admin_boundaries dist ON dist.code = ds.parent_code AND dist.level = 'DISTRICT'
  LEFT JOIN admin_boundaries prov ON prov.code = dist.parent_code AND prov.level = 'PROVINCE'
  WHERE gn.level = 'GN_DIVISION'
    AND ST_Contains(gn.boundary, p_point)
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Function: Cluster nearby incidents using DBSCAN
-- Groups incidents within 75m of each other (0.000675 degrees at ~7°N latitude)
-- ============================================================================
CREATE OR REPLACE FUNCTION cluster_incidents(
  p_category incident_category,
  p_hours_ago INT DEFAULT 24
)
RETURNS TABLE(
  incident_id UUID,
  cluster_id INT,
  location GEOMETRY,
  category incident_category
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id AS incident_id,
    ST_ClusterDBSCAN(i.location, eps := 0.000675, minpoints := 1)
      OVER(PARTITION BY i.category) AS cluster_id,
    i.location,
    i.category
  FROM incidents i
  WHERE i.category = p_category
    AND i.status IN ('UNVERIFIED', 'VERIFIED')
    AND i.created_at >= NOW() - (p_hours_ago || ' hours')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Function: Find incidents near a point for verification prompts
-- Returns unverified incidents within a given radius (default 500m)
-- ============================================================================
CREATE OR REPLACE FUNCTION find_nearby_incidents(
  p_lng DOUBLE PRECISION,
  p_lat DOUBLE PRECISION,
  p_radius_meters INT DEFAULT 500
)
RETURNS TABLE(
  incident_id UUID,
  category incident_category,
  description TEXT,
  distance_meters DOUBLE PRECISION,
  created_at TIMESTAMPTZ,
  confidence_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    i.id AS incident_id,
    i.category,
    i.description,
    ST_Distance(
      i.location::geography,
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography
    ) AS distance_meters,
    i.created_at,
    i.confidence_score
  FROM incidents i
  WHERE i.status IN ('UNVERIFIED', 'VERIFIED')
    AND ST_DWithin(
      i.location::geography,
      ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
      p_radius_meters
    )
  ORDER BY distance_meters ASC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Seed: Initial admin user
-- ============================================================================
INSERT INTO users (id, user_type, name, phone, is_active, is_trusted_approved)
VALUES (
  uuid_generate_v4(),
  'ADMIN',
  'FloodBlast System Admin',
  '+94000000000',
  TRUE,
  TRUE
);

-- ============================================================================
-- Log successful initialization
-- ============================================================================
DO $$
BEGIN
  RAISE NOTICE 'FloodBlast database initialized successfully with PostGIS extensions.';
  RAISE NOTICE 'Tables created: users, tickets, incidents, incident_media, verifications,';
  RAISE NOTICE '  victim_reports, relief_requests, donations, safe_places, safe_place_media,';
  RAISE NOTICE '  emergency_contacts, admin_boundaries, ticket_closure_votes, activity_log';
  RAISE NOTICE 'Functions created: resolve_admin_location, cluster_incidents, find_nearby_incidents';
END $$;
