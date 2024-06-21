export type User = {
    id: string;
    accountId: string;
    fullName: string;
    bio: null;
    avatar: null;
    email: string;
    position: null | string;
    shares: number;
    groups: [];
    roles: [];
    unitsOwned: [];
    unitsControlled: [];
    permissions: string[];
    menuSettings: [];
    dashboardSettings: [];
    state: string;
    createDate: string;
    updateDate: string;
    _links: {
      self: { href: string };
      users: { href: string };
    };
  };