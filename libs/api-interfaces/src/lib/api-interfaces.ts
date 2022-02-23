import { ApiProperty } from '@nestjs/swagger';

export interface Message {
  message: string;
}

export class CartRequest  {
  @ApiProperty({
    example: 'adasd-asd-asd-asd',
    description: 'Registered ShopId',
  })
  shopId: string;
  @ApiProperty({
    example: { product: '123', price: 12.99, quanity:1 } as Cart,
    description: 'Cart details',
  })
  cart: Cart;
  @ApiProperty({
    example: { state: 'IL', zipCode: '60030' } as Shipping,
    description: 'Shipping details',
  })
  shipping: Shipping;
  @ApiProperty()
  total: number;
}
export interface Cart {
  product: string;
  price: number;
  quanity: number;
}
export interface Shipping {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}
