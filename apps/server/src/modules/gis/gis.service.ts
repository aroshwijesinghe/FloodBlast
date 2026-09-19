import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface AdminLocation {
  gn_division: string;
  ds_division: string;
  district: string;
  province: string;
}

@Injectable()
export class GisService {
  constructor(private dataSource: DataSource) {}

  /**
   * Resolves GPS point to administrative division
   * @param lng Longitude
   * @param lat Latitude
   */
  async resolveLocation(lng: number, lat: number): Promise<AdminLocation> {
    const result = await this.dataSource.query(
      `SELECT * FROM resolve_admin_location(ST_SetSRID(ST_MakePoint($1, $2), 4326))`,
      [lng, lat]
    );
    return result[0];
  }

  /**
   * Checks if point2 is within distance of point1
   * @param lng1 Point 1 Longitude
   * @param lat1 Point 1 Latitude
   * @param lng2 Point 2 Longitude
   * @param lat2 Point 2 Latitude
   * @param meters Maximum distance in meters
   */
  async isWithinRange(lng1: number, lat1: number, lng2: number, lat2: number, meters: number): Promise<boolean> {
    const result = await this.dataSource.query(
      `SELECT ST_DWithin(
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        ST_SetSRID(ST_MakePoint($3, $4), 4326)::geography,
        $5
      ) as is_within`,
      [lng1, lat1, lng2, lat2, meters]
    );
    return result[0].is_within;
  }
}
