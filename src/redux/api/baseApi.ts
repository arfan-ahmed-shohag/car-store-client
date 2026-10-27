import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../fetchers/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://auto-sphare-server.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType > = async (args, api, extraOptions) : Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status == 401) {
    const res = await fetch(
      `https://auto-sphare-server.vercel.app/api/auth/generate-new-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    const newToken = data?.data?.newToken;


    if (newToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser({ user, token: newToken }));

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Cars", "Orders", "Revenue", "Reviews"],
  endpoints: () => ({}),
});
