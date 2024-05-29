export interface ApiResponse<T> {
  data: T;
}

export interface ContactData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface ContactDataResponse {
  data: ContactData[];
  message: string;
}
