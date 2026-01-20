import {JwtPayload} from 'jwt-decode';

export interface User extends JwtPayload{
  id: number;
  username: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
