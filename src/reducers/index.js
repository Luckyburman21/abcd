import { combineReducers } from "redux";
import budgetReducer from "./BudgetRequestReducer";

//  const rootReducer = combineReducers({
   export default combineReducers({
  budgetRequest: budgetReducer,
});

//  export default rootReducer;
