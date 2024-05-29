import { ApiResponse } from "../types/contact.type";
import api from "./apiConfig";

const getData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  const response = await api.get<T>(endpoint);
  return { data: response.data };
};

const getDetail = async <T>(
  endpoint: string,
  id: number | undefined | string
): Promise<ApiResponse<T>> => {
  const response = await api.get<T>(`${endpoint}/${id}`);
  return { data: response.data };
};

const postData = async <T, U>(
  endpoint: string,
  body: T
): Promise<ApiResponse<U>> => {
  const response = await api.post<U>(endpoint, body);
  return { data: response.data };
};

const putData = async <T, U>(
  endpoint: string,
  id: string | number | undefined,
  body: T
): Promise<ApiResponse<U>> => {
  const response = await api.put<U>(`${endpoint}/${id}`, body);
  return { data: response.data };
};

const deleteData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  const response = await api.delete<T>(endpoint);
  return { data: response.data };
};

export { getData, postData, putData, deleteData, getDetail };
