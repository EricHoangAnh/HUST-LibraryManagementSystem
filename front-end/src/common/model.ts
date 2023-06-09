export interface IAccount {
  account?: string | number;
  password?: string;
}
export interface IUser {
  account?: string | number;
  password?: string;
  userName?: string;
  gender?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
}
export interface IDocument {
  _id?: string;
  name?: string;
  documentCode?: string | number;
  documentTypeId?: string | number;
  photo?: any;
  author?: string;
  file?: any;
  description?: string;
}
