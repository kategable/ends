export interface Message {
  message: string;
}
export interface CartRequest
{
  shopId: string;
  cart: Cart;
  shipping: Shipping;
  total: number;
  tax: number;
}
export interface Cart{
  product:string;
  price:number;
  quanity: number;
}
export interface Shipping{
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}
