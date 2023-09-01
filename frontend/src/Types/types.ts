export type TabSelection = 'users' | 'addAdmin';

export interface Product {
  _id: string;
  name: string;
  stocks: number;
  pickupDate: string;
  pickupTime: { start: string; end: string };
  price: number;
  originalPrice: number;
  store: {
    storeName: string;
    address: string;
    detailedAddress: string;
  };
}