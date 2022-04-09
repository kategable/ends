import { ApiProperty } from '@nestjs/swagger';

export interface Message {
  message: string;
}

export class CartRequest {
  @ApiProperty({
    type: String,
    example: 'adasd-asd-asd-asd',
    description: 'Registered ClientId',
  })
  clientId: string;
  @ApiProperty({
    example: {
      products: [{ product: '123', price: 12.99, quantity: 1 }],
    },
    description: 'Cart details',
  })
  cart: Cart;
  @ApiProperty({
    example: { address: { state: 'IL', zipCode: '60030' } },
    description: 'Shipping details',
  })
  shipping: Shipping;
  @ApiProperty({
    type: Number,
    example: 59.99,
    description: 'Total amount paid',
  })
  total: number;
}
export class Product {
  @ApiProperty({
    type: String,
    example: 'SKU123',
    description: 'Product SKU',
  })
  product: string;
  @ApiProperty({
    type: String,
    example: '19.99',
    description: 'Product Price',
  })
  price: number;
  @ApiProperty({
    type: String,
    example: '2',
    description: 'Product quantity',
  })
  quantity: number;
}
export interface Cart {
  products: Product[];
}
export interface Shipping {
  address: Address;
}
export class Address {
  @ApiProperty({
    type: String,
    example: '123 Main st',
    description: 'Address 1st line',
  })
  addressLine1: string;
  @ApiProperty({
    type: String,
    example: 'suit 101',
    description: 'Address 2nd line',
  })
  addressLine2: string;
  @ApiProperty({
    type: String,
    example: 'Chicago',
    description: 'City',
  })
  city: string;
  @ApiProperty({
    type: String,
    example: 'Illinois',
    description: 'State name',
  })
  state: string;
  @ApiProperty({
    type: String,
    example: '60020',
    description: 'Zipcode',
  })
  zipCode: string;
}
function ApiModelProperty(arg0: {
  example: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  description: string;
}) {
  throw new Error('Function not implemented.');
}
