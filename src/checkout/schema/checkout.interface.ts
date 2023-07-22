
import { Item } from '../../cart/schemas/item.schema';
import { User } from '../../user/schemas/user.schema';


export interface CheckOutProps {
    user: string;
    items: Item[];
    totalPrice: number,
    discount?: number,
    time: string,
    orderId: string,
    txHash:string,
  }
