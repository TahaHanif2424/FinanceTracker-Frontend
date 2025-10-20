export interface User {
  id: string;
  name: string;
  email: string;
  isFriend?: boolean;
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  balance?: number;
  transactions?: number;
}
