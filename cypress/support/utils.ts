import { User } from '../support/types';

export function generateUser(index: number): User {
  return {
    id: `user-${index}`,
    accountId: `account-${index}`,
    fullName: `test_${String(index).padStart(3, '0')}@seznam.cz`,
    bio: null,
    avatar: null,
    email: `test_${String(index).padStart(3, '0')}@seznam.cz`,
    position: null,
    shares: index % 2 === 0 ? 1.0 : 0.0,
    groups: [],
    roles: [],
    unitsOwned: [],
    unitsControlled: [],
    permissions: ['*'],
    menuSettings: [],
    dashboardSettings: [],
    state:
      index % 3 === 0
        ? 'INVITED'
        : index % 3 === 1
        ? 'VIEW_ONLY'
        : 'FULL_ACCESS',
    createDate: `2024-06-19T07:34:38.${String(index).padStart(3, '0')}Z`,
    updateDate: `2024-06-19T07:34:38.${String(index).padStart(3, '0')}Z`,
    _links: {
      self: {
        href: `https://api.votify.app/general/v1/users/user-${index}`,
      },
      users: {
        href: 'https://api.votify.app/general/v1/users',
      },
    },
  };
}

export function userCount(index: number): User[] {
  const users: User[] = [];
  for (let i = 0; i < index; i++) {
    users.push(generateUser(i));
  }
  return users;
}
