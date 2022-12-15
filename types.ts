
export type TRole = 'admin' | 'agent' | 'manager' | 'member';

export interface IMember {
  email: string;
  avatar: string;
  fullName: string;
  inboxes: string[];
  role: TRole;
  isPending: boolean;
}

export interface IOption {
  label: string;
  value: string;
}
