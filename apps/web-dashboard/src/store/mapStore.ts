import { create } from 'zustand';
import { GeoPoint } from '../types/interfaces';
import { CONSTANTS } from '../types/constants';

interface MapState {
  center: GeoPoint;
  zoom: number;
  selectedMarkerId: string | null;
  setCenter: (center: GeoPoint) => void;
  setZoom: (zoom: number) => void;
  setSelectedMarkerId: (id: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: CONSTANTS.MAP_DEFAULTS.CENTER,
  zoom: CONSTANTS.MAP_DEFAULTS.ZOOM,
  selectedMarkerId: null,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedMarkerId: (id) => set({ selectedMarkerId: id })
}));
