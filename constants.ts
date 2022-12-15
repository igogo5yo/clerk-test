import { IOption, TRole } from "./types";

export const inboxes: IOption[] = [
  { label: 'Demo Clerk', value: 'demo-clerk' },
  { label: 'Long inbox title 20 characters should be visible', value: 'long-name' },
  { label: 'Work Inbox', value: 'work-inbox' },
];

export const roles = new Map<TRole, string>();
roles.set('admin', 'Admin');
roles.set('agent', 'Agent');
roles.set('manager', 'Manager');
roles.set('member', 'Member');

export const QUERIES = {
  MEMBERS: 'MEMBERS',
  INVITED_MEMBERS: 'INVITED_MEMBERS'
};

