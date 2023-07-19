export interface IAccount {
  account?: string | number;
  password?: string;
}
export interface IUser {
  _id?:string;
  account?: string | number;
  password?: string;
  gender?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role?:string
}

export interface IDocument {
  _id?: string;
  name?: string;
  documentCode?: string | number;
  documentTypeId?: string | number;
  typeInfo?: any,
  photo?: any;
  author?: string;
  file?: any;
  description?: string;
  userId?:string;
  createdAt?: string,
  lastUpdated?: string,
  status?: number,
  docId?:string,
  reqId?:string,
}

export interface IType {
  _id?: string;
  title?: string;
  note?: string;
}

export enum RequestSatus {
  UserCancel = -1,
  Rejected = 0,
  Pending = 1,
  Approved = 2,
  Completed = 3
}