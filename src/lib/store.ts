import { configureStore } from "@reduxjs/toolkit";
import paletteReducer from "@/lib/features/theme/paletteSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      palette: paletteReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
