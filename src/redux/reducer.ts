import { combineReducers } from "redux";

import userReducer from "./user.slice";

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Type for the RootState

export default rootReducer;
