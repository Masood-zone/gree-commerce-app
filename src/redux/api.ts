import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
    prepareHeaders: async (headers, { getState }) => {
      const token = getState().persistedReducer.user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    userSignup: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    getUserInfo: builder.query({
      query: () => "/users/1",
    }),
    getProducts: builder.query({
      query: () => "/products",
    }),
    getTopProducts: builder.query({
      query: () => "/products/category/men's clothing?sort=asc?limit=4",
    }),
    getNewProducts: builder.query({
      query: () => "/products?limit=4",
    }),
    getProductDetail: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    getCart: builder.query({
      query: (id) => ({
        url: `/carts/user/${id}`,
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
    }),
    updateCartItem: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "PUT",
        body: data,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
