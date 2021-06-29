export enum PermissionTypes {
  Active = 'active',
}

export enum ActionTypes {
  NewAccount = 'newaccount',
  BuyRamBytes = 'buyrambytes',
  DelegateBandwidth = 'delegatebw',
}

export interface TransactionAuthorization {
  actor: string;
  permission: PermissionTypes;
}

export interface Key {
  key: string;
  weight: number;
}

export interface TransactionPermission {
  threshold: number;
  keys: Key[];
  accounts: string[]; //not sure this is right, update later
  waits: number[]; //not sure this is right, update later
}

export interface TransactionData {
  creator: string;
  name: string;
  owner: TransactionPermission;
  active: TransactionPermission;
}

export interface Transaction {
  account: string;
  name: string;
  authorization: TransactionAuthorization[];
  data: TransactionData;
}

export const EOSIO_ACCOUNT = 'eosio';
