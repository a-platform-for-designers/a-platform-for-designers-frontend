export interface IAuthUserRequest {
  email: string;
  password: string;
}

export interface IResetPasswordConfirmData {
  new_password: string;
  uid: string;
  token: string;
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
  is_customer: boolean | undefined;
}

export interface IProfileCustomer {
  id?: number | undefined;
  post: string | null;
  photo: File | unknown;
  about: string | null;
  country: string | null;
}

export interface IResume {
  id: number;
  instruments: IDataItem[];
  skills: IDataItem[];
  about: string;
  status: boolean;
}

export interface IMentoring {
  experience: string;
  expertise: string;
  price?: number | null;
  agreement_free?: boolean | null;
  id: number;
  instruments?: Array<{ id: number; name: string }>;
  skills?: Array<{ id: number; name: string }>;
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
  instruments: number[];
  skills: number[];
  about: string;
  work_status: boolean;
  mentoring: IMentoring;
  is_subscribed: boolean;
  specialization: object[];
}

export interface IUserWithLastCases extends IUser {
  last_cases: [ICase, ICase];
  specialization: object[];
  country: string;
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
  avatar: string;
  specialization: IDataItem;
}

export interface IFavouriteCase {
  avatar: string;
  id: number;
  title: string;
}

export interface ICaseInfo {
  title?: string | null;
  sphere?: IDataItem;
  instruments?: string[];
  working_term?: string;
  description?: string;
}

export interface ICasePreview {
  title: string;
  time: string;
  description: string;
  directions: string | null;
  wrapper: File | null;
  images: File[];
  sphereValue: string | null;
  toolsValue: string[];
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
  results: IUserWithLastCases[];
}

export interface IOrderDataItem {
  id: number;
  photo: string | null;
  first_name: string;
  last_name: string;
  title: string;
  description: string;
  price: number;
  specialization: string;
  sphere: string;
}

export interface IOrdersResponse {
  count: number;
  next: string;
  previous: string;
  results: [];
}

export interface IOrderCreation {
  title: string;
  specialization: number | number[] | null;
  description: string;
  sphere: number | number[] | null;
  payment: number;
}

export interface IOrderInfoResponse {
  applicants?: IApplicant[];
  customer: IOrdersCustomer;
  description: string;
  id: number;
  payment: number;
  pub_date: string;
  specialization: IDataItem;
  sphere: IDataItem;
  title: string;
  is_responded_order?: boolean;
  is_favorited_order?: boolean;
}

export interface IOrdersList {
  applicants?: IApplicant[];
  id: number;
  customer: IOrdersCustomer;
  title: string;
  specialization: IDataItem;
  payment: number;
  sphere: IDataItem;
  description: string;
  pub_date: string;
  is_responded_order: boolean;
  is_favorited_order: boolean;
  is_published: boolean;
}

export interface IMyOrderResponse {
  customer: IOrderApplicant;
  description: string;
  id: number;
  is_favorited_order: boolean;
  is_published: boolean;
  is_responded_order: boolean;
  payment: number;
  pub_date: string;
  specialization: IDataItem;
  sphere: IDataItem;
  title: string;
}

export interface IOrderApplicant {
  first_name: string;
  id: number;
  last_name: string;
  photo: string;
  post: string;
}

export interface IApplicant {
  country: string;
  first_name: string;
  id: number;
  last_name: string;
  photo: string;
  specialization: object[];
}

export interface IOrderResponse {
  customer: IOrdersCustomer | IOrderApplicant;
  title: string;
  specialization: IDataItem;
  payment: number;
  sphere: IDataItem;
  description: string;
  is_published: boolean;
}

export interface IOrdersCustomer {
  id: 0;
  first_name: string;
  last_name: string;
  photo: string;
  post: string;
}

export interface IUserInfo {
  name: string | null;
  avatar: string | null;
}

export interface IResumeNew {
  instruments: number[];
  skills: number[];
  about: string;
  status: boolean;
}

export interface IUpdateInfoUserMe {
  id?: number;
  photo?: File | unknown;
  specialization?: number[] | string[];
  country?: string | null;
  education?: string | null;
  language?: number[] | string[];
  hobby?: string;
  user?: number;
}

export interface IUpdateInfoMeCustomer {
  id?: number | undefined;
  country: string | null;
  photo: File | unknown;
  post: string | null;
  about: string | null;
}

export interface IProfileDesigner {
  id?: number;
  user?: number;
  education?: string | null;
  country?: string | null;
  specialization?: IDataItem[] | number[] | null;
  hobby?: string;
  language?: string[] | number[];
  photo?: File | unknown;
  instruments: number[];
  skills: number[];
  about: string;
  work_status: boolean;
}

export interface IProfileData {
  first_name?: string;
  last_name?: string;
  post?: string;
  specialization?: IDataItem[] | number[] | string[];
  image?: string;
  country?: string;
  registrationDate?: string;
  status?: string;
  likes?: number;
  followers?: number;
}

export interface ICaseCreation {
  title: string;
  specialization?: number | number[] | null;
  avatar: string;
  images: { image: string }[];
  working_term?: string;
  instruments?: string[] | number[] | null | number;
  description?: string;
  sphere?: number | number[] | null;
}

export interface ICreateChat {
  receiver: number;
}

export type Message = string;

export interface IChatParticipant {
  id: number;
  first_name: string;
  last_name: string;
  photo: string;
}

export interface IChat {
  id: number;
  initiator: IChatParticipant;
  receiver: IChatParticipant;
  last_message: Message;
}

export interface IMessage {
  id: number;
  chat: IChat;
  sender: IChatParticipant;
  text: Message;
  pub_date: string;
  file: string;
}

export interface IChatResponse extends IListRespons {
  results: IChat[];
}

export interface ISendMessage {
  receiver: number;
  text?: string;
  file?: string;
}

export interface ISendFileResponse {
  id: number;
  chat: number;
  sender: IChatParticipant;
  pub_date: string;
  file: string;
}

export interface ISocketMessage {
  message?: string;
  file?: string;
  action?: "load_more";
  page_number?: number;
}

export interface IProfileNavPage {
  title: string;
  link: string;
  element: JSX.Element;
}

// интерфейс данных категории, которые нужно передать в пропсах
export interface IWorkCategoryData {
  title: string;
  link: string;
}

// Отдельно выбирается одна категория и "Ваши подписки"
export interface IActiveWorkCategoryState {
  allDirections: boolean;
  categories: string[];
  following: boolean;
}

export interface IDesinerCategoriesData {
  title: string;
  image: string;
  link: string;
  onClick?: () => void;
}

export interface IValidation {
  isEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isName?: boolean;
  isPhone?: boolean;
  badDataError?: boolean;
  isPassword?: boolean;
}

export interface ISetNewPassword {
  current_password: string;
  new_password: string;
  re_new_password: string;
}

export interface IProfileDesignerPost {
  id?: number;
  user?: number;
  education?: string | null;
  country?: string | null;
  specialization?: IDataItem[] | number[] | null;
  hobby?: string;
  language?: string[] | number[];
  photo?: File | unknown;
  instruments: number[];
  skills: number[];
  about: string;
  work_status: boolean;
}

export interface IPostMentoring {
  experience: string;
  expertise: string;
  price?: number | null;
  agreement_free: boolean | null;
}

export interface ISupport {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IUserSubscriber {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  is_subscribed: boolean;
  specialization?: IDataItem[];
  photo: string;
}

export interface ISubscriptionsResult {
  results: IUserSubscriber[];
}

export interface IFollowersCount {
  subscribers_count: number;
}
