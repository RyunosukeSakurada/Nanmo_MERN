export type TabSelection = 'users' | 'addAdmin' | 'approvedRequestTable' | 'faq' | 'contact' ;
export type TabSelectionForStore = "products" | "approvalRequest" | "storeInformation";

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
    _id:string;
    storeName: string;
    address: string;
    detailedAddress: string;
    storeLogo:string;
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

export interface Contact{
  _id:string,
  name:string,
  storeName:string,
  email:string,
  message:string,
  isRead:boolean,
  isHandled:boolean,
}

export interface Order {
  _id?: string;  
  user: string;  
  store: Store; 
  items: {
      product: Product;  
      quantity: number;
  }[];
  status: 'pending' | 'done';
}