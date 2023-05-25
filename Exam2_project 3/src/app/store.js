import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { usersApi } from "../services/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { venueApi } from "../services/venueApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [venueApi.reducerPath]: venueApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(venueApi.middleware),
});
setupListeners(store.dispatch);
