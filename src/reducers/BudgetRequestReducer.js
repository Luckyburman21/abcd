import { BUDGET_REQUEST, ADD_NEW_BUDGET_REQUEST } from"../actions/types";

// Initial state structure
const initialState = {
  budgetRequest: [],         // Store all budget requests
  newBudget: null,     // Store the newly created budget request
};

export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case BUDGET_REQUEST:
      return {
        ...state,
        budgetRequests: action.payload,   // Update the list of budgets
      };
    case ADD_NEW_BUDGET_REQUEST:
      return {
        ...state,
        newBudget: action.payload,   // Update the state with the newly added budget
      };
    default:
      return state;
  }
}
