import { BUDGET_REQUEST, ADD_NEW_BUDGET_REQUEST } from "../types";
import basePath from "../basepath";

// // Action to create a new budget request
export const NewBudgetRequest = (fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead) => async (dispatch) => {
  // export const NewBudgetRequest = (budgetData) => async (dispatch) => {

  console.log("BudgetRequestAction::NewBudgetRequest::fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead",fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead);
  try {
    const response = await basePath.post(
      `/budgetRequest/addBudgetReq`,
      { fyRE, fyBE, fyMA, date,evenNoDate, revisedDate, email,letterHead},
      // { budgetData },
      { responseType: "arraybuffer" }
    );
    console.log("BudgetRequestAction::NewBudgetRequest::response", response);

    // Dispatch action to store the new budget request
    dispatch({
      type: ADD_NEW_BUDGET_REQUEST,
      payload: response.data,
    });

    console.log("NewBudgetRequest::response.data", response.data);
  } catch (error) {
    console.error("Error in NewBudgetRequest:", error);
  }
};

// Action to get all budget requests (or a single budget request by ID)
export const budgetRequest = (budgetReqId) => async (dispatch) => {
  try {
    const response = await basePath.get(`/budgetReqId`, {
      params: { budgetReqId },
    });

    dispatch({
      type: BUDGET_REQUEST,
      payload: response.data,
    });

    console.log("BudgetRequest::response", response);
  } catch (error) {
    console.error("Error in BudgetRequest:", error);
  }
};

