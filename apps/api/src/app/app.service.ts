import { Injectable } from '@nestjs/common';
import { CartRequest, Message } from '@ends/api-interfaces';

@Injectable()
export class AppService {

  saveOrder(cartRequest: CartRequest):number {
    console.log("order saved", cartRequest);
    return 123;
  }
  culculate(cartRequest: CartRequest): number {
    console.log("tax calculated", cartRequest);
    return 10.99
  }
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
