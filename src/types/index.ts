export interface IAuthUserRequest {
  email: string;
  password: string;
}

export interface IToken {
  auth_token: string;
}

export interface IUserShort {
  email: string;
  first_name: string;
  last_name: string;
  is_customer: boolean;
  photo: string;
  id: number;
}

export interface ICreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  is_customer: boolean;
}

export interface IProfileCustomer {
  id: number;
  post: string;
}

export interface IProfileDesigner {
  id: number;
  user: number;
  education: string;
  country: string;
  specialization: IDataItem;
  hobby: string;
  language: string[];
}

export interface IResume {
  id: number;
  instruments: IDataItem[];
  skills: IDataItem[];
  about: string;
  status: boolean;
}

export interface IUser {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  description: string | null;
  is_customer: boolean;
  profilecustomer: IProfileCustomer | null;
  profiledesigner: IProfileDesigner | null;
  resume: IResume | null;
  date_joined: string;
  portfolio: IUserCase[];
}

export interface IUserCase {
  id: number;
  avatar: string;
}

export interface IDataItem {
  id: number;
  name: string;
}

export interface ICaseImage {
  id: number;
  image: string;
}

export interface IAuthorCase {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
  specialization: number;
}

export interface ICase {
  id: number;
  author: IAuthorCase;
  title: string;
  sphere: IDataItem;
  instruments: IDataItem[];
  working_term: string;
  description: string;
  is_favorited: boolean;
  is_liked: boolean;
  images: ICaseImage[];
}

export interface IListRespons {
  count: number;
  next: string;
  previous: string;
}

export interface ICaseRespons extends IListRespons {
  results: ICase[];
}

export interface IUserRespons extends IListRespons {
  results: IUser[];
}
