import { IMember } from "./types";

export const inviteMembers = (members: IMember[]) => fetch('/api/invited', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(members)
});

export const fetchMembers = () => fetch('/api/members').then(res => res.json()) as Promise<IMember[]>;

export const updateMember = (member: IMember) => fetch('/api/invited', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(member)
});

export const deleteMember = (email: string) => fetch('/api/invited', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(email)
});

