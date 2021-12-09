import { Stock } from "./stock";
import { User } from "./user";

export interface UserStock {
  user: User;
  stock: Stock;
}
