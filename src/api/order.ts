import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrderRequestAdd, IOrderResponse } from "../interfaces/order";
import { RootState } from "../store/store";

const orderApi = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8088/api/",
    prepareHeaders(headers, {getState}) {
      const token = (getState() as RootState).user.token
      if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
  }, 
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<IOrderResponse, void>({
      query: () => 'order', // Update with your actual endpoint
      providesTags:['Order'],
    }),
    getOrderById: builder.query<IOrderResponse, string>({
      query: (id) => `order/${id}`,
    }),
    createOrder: builder.mutation<IOrderResponse, IOrderRequestAdd>({
      query: (data) => ({
        url: 'order/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation<IOrderResponse, { id: string, data: IOrderRequestAdd }>({
      query: ({ id, data }) => ({
        url: `order/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderApi;

export const orderReducer = orderApi.reducer;
export default orderApi;