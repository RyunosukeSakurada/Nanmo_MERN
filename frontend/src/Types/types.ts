export type TabSelection = 'users' | 'addAdmin' | 'approvedRequestTable';
export type TabSelectionForStore = "products" | "approvalRequest";

export interface Product {
  _id: string;
  name: string;
  stocks: number;
  description:string;
  productImage:string;
  pickupDate: string;
  pickupTime: { start: string; end: string };
  price: number;
  originalPrice: number;
  store: {
    storeName: string;
    address: string;
    detailedAddress: string;
  };
  isSold:boolean;
}

export interface Store {
  _id:string,
  storeName:string,
  address: string,
  detailedAddress:string,
  postalCode: string,
  email:string,
  password:string,
  storeLogo:string,
  blocked:boolean,
  suspended:boolean,
  approved: boolean,
  requested:boolean,
  requestDeclined:boolean,
  isStore:boolean,
  isAdmin:boolean,
}