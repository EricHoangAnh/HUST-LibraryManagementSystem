export interface IAccount {
  account: string | number;
  password: string;
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
