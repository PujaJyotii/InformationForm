import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "./ListSlice";

const Store = configureStore({
  reducer: { list: ListSlice },
});

export default Store;
