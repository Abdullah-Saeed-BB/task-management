import {
  configureStore,
  createListenerMiddleware,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isRejectedWithValue,
  effect: async (action, listenerApi) => {
    const { originalStatus } = action.payload as { originalStatus: number };

    if (originalStatus === 403) {
      const res = await fetch("/api/refresh", {
        method: "POST",
      });

      if (res.ok) {
        listenerApi.dispatch(apiSlice.util.resetApiState());
      }
    }
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiSlice.middleware,
        listenerMiddleware.middleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
