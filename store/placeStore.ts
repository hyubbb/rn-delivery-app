import { create } from "zustand";

export interface Product {
  address: string;
}

export interface placeStore {
  address: string;
  addPlace: (place: string) => void;
  reduceProduct: (place: Product) => void;
  // clearCart: () => void;
}

const usePlaceStore = create<placeStore>()((set) => ({
  address: "",
  addPlace: (place) => {
    set(() => ({ address: place }));
  },
  reduceProduct: (place) => {},
  // clearCart: () => set({ product: [], items: 0, total: 0 }),
}));

export default usePlaceStore;
