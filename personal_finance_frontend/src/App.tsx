import { useState, useEffect, SetStateAction } from "react";

import TopBar from "./components/TopBar";
import ExpenseSummary from "./components/ExpenseSummary";
import NewExpenseForm from "./components/NewExpenseForm";
import AllExpensesView from "./components/AllExpensesView";

import {
  getUserName,
  getMonthlyHeights,
  getAllExpenses,
  getMonths,
  getMonthlyTotals,
  getMonthlySum,
  addExpense,
  deleteExpense,
  refreshData,
  establishSession,
} from "./services/apiService";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

establishSession();

function App() {
  // NOTE: MOCK DATA /////////////
  // sample heights, to be replaced by request get
  // actual data needed:
  // userName -- endpoint: '/api/user_name'
  // heights -- endpoint: '/api/get_monthly_heights' params = month
  // data (all expenses) -- endpoint: '/api/get_all_expenses'
  // months -- endpoint:'/api/months_list'
  // monthlyTotals -- endpoint: '/api/get_monthly_totals' params = month
  // sum -- endpoint: '/api/get_monthly_sum' params = month

  // methods (post)
  // addExpense -- endpoint: '/api/add_expense'
  // deleteExpense -- endpoint: '/api/delete_expense' params = index
  // refreshData -- endpoint: '/api/refresh_data'
  /// handle form submission

  // handle month dropdown change
  const [month, setMonth] = useState("ALL");
  const handleMonthClick = (index: any, month: SetStateAction<string>) => {
    console.log(index, month);
    setMonth(month);
  };

  const [userName, setUserName] = useState("");
  const [heights, setHeights] = useState<
    { category: string; amount: number }[]
  >([]);
  const [expenses, setExpenses] = useState<{ [key: string]: any }>([]);
  const [months, setMonths] = useState(["ALL"]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        refreshData();
        const userNameData = await getUserName();
        setUserName(userNameData);
        const monthsListData = await getMonths();
        setMonths(monthsListData);
        const monthlyHeightsData = await getMonthlyHeights(month);
        setHeights(monthlyHeightsData);
        const expensesData = await getAllExpenses();
        setExpenses(expensesData);
        const monthlyTotalsData = await getMonthlyTotals(month);
        setMonthlyTotals(monthlyTotalsData);
        const monthlySumData = await getMonthlySum(month);
        setSum(monthlySumData.sum);
        console.log(monthlySumData.sum);
      } catch (error) {
        console.error("error fetching data:", error);
      }
    };
    fetchData();
  }, [month]);

  const refreshEverything = async () => {
    const refreshedData = await refreshData();
    setExpenses(refreshedData);
    const newMonthsListData = await getMonths();
    setMonths(newMonthsListData);
    const newMonthlyHeightsData = await getMonthlyHeights(month);
    setHeights(newMonthlyHeightsData);
    const newMonthlyTotalsData = await getMonthlyTotals(month);
    setMonthlyTotals(newMonthlyTotalsData);
    const newMonthlySumData = await getMonthlySum(month);
    setSum(newMonthlySumData.sum);
  }

  const handleFormSubmit = async (formData: {
    date: string;
    category: string;
    title: string;
    amount: string;
    notes: string;
  }) => {
    // Handle the form submission data here
    console.log("Form data received in App component:", formData);
    console.log("month", month);
    try {
      const newExpense = await addExpense(formData);
      console.log(newExpense);
      // update all data
      refreshEverything();

      console.log(newExpense);
    } catch (error) {
      console.error("error adding expense:", error);
    }

    // You can send the data to the backend or update the state as needed
  };

  const handleDeleteExpense = async (index: string, title: string) => {
    try {
      alert(["Deleting expense", title, "index", index]);
      const deleteExpenseResult = await deleteExpense(index);
      console.log(deleteExpenseResult);
      refreshEverything();
    } catch (error) {
      console.error("error deleting expense:", error);
    }
  };

  /////////////

  return (
    <>
      <TopBar userName={userName} />
      <ExpenseSummary
        months={months}
        onMonthClick={handleMonthClick}
        heights={heights}
        sum={sum}
        monthlyTotals={monthlyTotals}
      />
      <NewExpenseForm onSubmit={handleFormSubmit} />
      <AllExpensesView
        data={expenses}
        onRowClick={(index, title) => console.log(index, title)}
        onDeleteButtonClick={(index, title) =>
          handleDeleteExpense(index, title)
        }
        onRefreshButtonClick={() => alert("Refresh clicked")}
      />
    </>
  );
}

export default App;
