import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export const getUserName = async () => {
  const response = await axios.get(`${API_BASE_URL}/user_name`);
  return response.data;
};

export const getMonthlyHeights = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_heights`, {
    params: { month },
  });
  return response.data;
};

export const getAllExpenses = async () => {
  const response = await axios.get(`${API_BASE_URL}/get_all_expenses`);
  return response.data;
};

export const getMonths = async () => {
  const response = await axios.get(`${API_BASE_URL}/months_list`);
  return response.data;
};

export const getMonthlyTotals = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_totals`, {
    params: { month },
  });
  return response.data;
};

export const getMonthlySum = async (month: string) => {
  const response = await axios.get(`${API_BASE_URL}/get_monthly_sum`, {
    params: { month },
  });
  return response.data;
};

export const addExpense = async (expenseData: any) => {
  const response = await axios.post(`${API_BASE_URL}/add_expense`, expenseData);
  return response.data;
};

export const deleteExpense = async (index: string) => {
  const response = await axios.post(`${API_BASE_URL}/delete_expense`, null, {
    params: { index },
  });
  return response.data;
};


export const refreshData = async () => {
    const response = await axios.post(`${API_BASE_URL}/refresh_data`);
    return response.data;
}

export const establishSession = async () => {
  const response = await axios.post(`${API_BASE_URL}/establish_session`);
  console.log(response.data)
  return response.data;
}