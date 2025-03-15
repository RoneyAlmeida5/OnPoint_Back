import { User } from '../modules/users/user.entity';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
