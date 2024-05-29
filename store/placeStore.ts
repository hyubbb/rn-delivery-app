import { create } from "zustand";

export interface Product {
  address: string;
}

export interface placeStore {
  address: string;
  addPlace: (place: string) => void;
  reduceProduct: (place: Product) => void;
}

const usePlaceStore = create<placeStore>()((set) => ({
  address: "",
  addPlace: (place) => {
    set(() => ({ address: place }));
  },
  reduceProduct: (place) => {},
}));

export default usePlaceStore;
