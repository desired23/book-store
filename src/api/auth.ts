import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  // AuthResponse,
  ILoginRequest,
  IRegisterRequest,
} from "../interfaces/auth";
import { AxiosResponse } from "axios";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8088/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, ILoginRequest>({
      query: (data) => ({
        url: `auth/login`,
        method:'POST',
        body:data
      }),
    }),
    register: builder.mutation<AxiosResponse, IRegisterRequest>({
      query: (data) => ({
        url: `auth/register`,
        method:'POST',
        body:data
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export const authReducer = authApi.reducer;
export default authApi;
