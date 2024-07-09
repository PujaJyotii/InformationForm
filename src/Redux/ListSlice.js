import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "List",
  initialState: { arr: [] },
  reducers: {
    add(state, action) {
      state.arr.push(action.payload);
    },
    delete(state, action) {
      state.arr = state.arr.filter((item) => item.name !== action.payload.name);
    },
    set(state, action) {
      state.arr = action.payload;
    },
    update(state, action) {
      const index = state.arr.findIndex(
        (item) => item.name === action.payload.id
      );
      if (index !== -1) {
        state.arr[index] = {
          ...state.arr[index],
          ...action.payload.updatedInfo,
        };
      }
    },
  },
});

export const ListSliceAction = ListSlice.actions;
export default ListSlice.reducer;
