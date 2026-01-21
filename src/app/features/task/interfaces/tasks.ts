import {User} from '../../../core/auth/interfaces/user';

export interface Tasks {
  id?: number;
  title: string;
  description: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
  targetUserId?: string | null
  user?: User
}

export enum Status {
  PENDING = 'PENDING',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS'
}
