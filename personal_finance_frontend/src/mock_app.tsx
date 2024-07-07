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
} from "./services/apiService";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  /// handle form submission
  const handleFormSubmit = (formData: {
    date: string;
    category: string;
    title: string;
    amount: string;
    notes: string;
  }) => {
    // Handle the form submission data here
    console.log("Form data received in App component:", formData);
    // You can send the data to the backend or update the state as needed
  };

  const [month, setMonth] = useState("ALL");
  const handleMonthClick = (index: any, month: SetStateAction<string>) => {
    console.log(index, month);
    setMonth(month);
  };
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

  // const [heights, setHeights] = useState([])
  // const [expenses, setExpenses] = useState([])
  // const [months, setMonths] = useState([])
  // const [monthlyTotals, setMonthlyTotals] = useState([])
  // const [sum, setSum] = useState(0)

  const heights = [
    { category: "food", amount: 0.5770378616 },
    { category: "fun", amount: 0.7415105906 },
    { category: "living", amount: 1.0 },
    { category: "transport", amount: 0.4047492297 },
  ];

  const expenses = {
    "0": {
      date: "2024-06-01",
      category: "food",
      title: "gongcha",
      amount: 7.0,
      notes: "taro bubble tea fye",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "1": {
      date: "2024-06-01",
      category: "fun",
      title: "Travel goods",
      amount: 5.05,
      notes: "Travel bottles n toofpaste ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "2": {
      date: "2024-06-01",
      category: "fun",
      title: "Cloud 9",
      amount: 21.53,
      notes: "Zaza ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "3": {
      date: "2024-06-01",
      category: "living",
      title: "Retinol",
      amount: 16.2,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "4": {
      date: "2024-06-01",
      category: "food",
      title: "TJS",
      amount: 66.23,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "5": {
      date: "2024-06-01",
      category: "living",
      title: "JUNE RENT",
      amount: 1100.0,
      notes: "JUNE RENT",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "6": {
      date: "2024-05-31",
      category: "fun",
      title: "nicotinic",
      amount: 17.34,
      notes: "i love stimulants",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "7": {
      date: "2024-05-30",
      category: "fun",
      title: "rag shorts",
      amount: 6.26,
      notes: "credit 4 cargo shorts",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "8": {
      date: "2024-05-29",
      category: "food",
      title: "chipotle",
      amount: 15.28,
      notes: "big n greedy",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "9": {
      date: "2024-05-29",
      category: "food",
      title: "kroger",
      amount: 5.11,
      notes: "lunch meat or sum i forg",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "10": {
      date: "2024-05-29",
      category: "fun",
      title: "zyn",
      amount: 9.05,
      notes: "zyn",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "11": {
      date: "2024-05-28",
      category: "fun",
      title: "shirt",
      amount: 1.09,
      notes: "out of the closet sale",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "12": {
      date: "2024-05-28",
      category: "food",
      title: "target spree",
      amount: 17.95,
      notes: "forgot what i bought",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "13": {
      date: "2024-05-28",
      category: "fun",
      title: "papers",
      amount: 4.53,
      notes: "and a drink",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "14": {
      date: "2024-05-27",
      category: "food",
      title: "grub",
      amount: 33.23,
      notes: "grub",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "15": {
      date: "2024-05-27",
      category: "transport",
      title: "gas",
      amount: 37.94,
      notes: "gas",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "16": {
      date: "2024-05-27",
      category: "food",
      title: "costco",
      amount: 176.86,
      notes: "big and greedy",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "17": {
      date: "2024-05-27",
      category: "food",
      title: "krooooger",
      amount: 16.95,
      notes: "kroge",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "18": {
      date: "2024-05-27",
      category: "fun",
      title: "zaza grinder",
      amount: 25.56,
      notes: "zazaaa",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "19": {
      date: "2024-05-27",
      category: "food",
      title: "targ",
      amount: 31.25,
      notes: "targ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "20": {
      date: "2024-06-02",
      category: "living",
      title: "Costco",
      amount: 79.81,
      notes: "Trash bags, paper towels, fairlife, dishwasher pods",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "21": {
      date: "2024-06-02",
      category: "food",
      title: "Chicken bake",
      amount: 5.0,
      notes: "",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "22": {
      date: "2024-06-02",
      category: "transport",
      title: "Gas",
      amount: 28.29,
      notes: "93 octane",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "23": {
      date: "2024-06-02",
      category: "food",
      title: "Walmart",
      amount: 19.43,
      notes: "Arizona, rice, yog, nandos",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "24": {
      date: "2024-06-04",
      category: "transport",
      title: "Marta",
      amount: 3.5,
      notes: "Lindbergh to airport",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "25": {
      date: "2024-06-04",
      category: "fun",
      title: "Plane",
      amount: 250.0,
      notes: "Satx ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "26": {
      date: "2024-06-04",
      category: "fun",
      title: "Vw",
      amount: 35.0,
      notes: "Vamp",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "27": {
      date: "2024-06-04",
      category: "food",
      title: "Bev",
      amount: 3.77,
      notes: "Airport",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "28": {
      date: "2024-06-04",
      category: "fun",
      title: "Cigs",
      amount: 14.06,
      notes: "Planet k",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "29": {
      date: "2024-06-04",
      category: "food",
      title: "Whata",
      amount: 15.0,
      notes: "Burger",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "30": {
      date: "2024-06-05",
      category: "food",
      title: "Tacos",
      amount: 15.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "31": {
      date: "2024-06-05",
      category: "food",
      title: "Bev",
      amount: 5.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "32": {
      date: "2024-06-05",
      category: "food",
      title: "Gas station shi",
      amount: 10.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "33": {
      date: "2024-06-06",
      category: "food",
      title: "Tacos",
      amount: 13.0,
      notes: "Tacos",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "34": {
      date: "2024-06-07",
      category: "food",
      title: "Valero ",
      amount: 21.0,
      notes: "T",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "35": {
      date: "2024-06-08",
      category: "food",
      title: "Ihop",
      amount: 20.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "36": {
      date: "2024-06-08",
      category: "food",
      title: "Canes",
      amount: 12.0,
      notes: "Hi",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "37": {
      date: "2024-06-09",
      category: "living",
      title: "Juul",
      amount: 16.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "38": {
      date: "2024-06-09",
      category: "fun",
      title: "Thrift",
      amount: 7.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "39": {
      date: "2024-06-10",
      category: "fun",
      title: "Zaza ",
      amount: 100.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "40": {
      date: "2024-06-11",
      category: "food",
      title: "Targ",
      amount: 24.37,
      notes: "Cereal n the like",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "41": {
      date: "2024-06-08",
      category: "transport",
      title: "marta from airport to parking",
      amount: 3.5,
      notes: "hi",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "42": {
      date: "2024-06-14",
      category: "food",
      title: "tacos",
      amount: 13.58,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "43": {
      date: "2024-06-14",
      category: "food",
      title: "target",
      amount: 6.67,
      notes: "milk + bread",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "44": {
      date: "2024-06-14",
      category: "fun",
      title: "nic",
      amount: 5.04,
      notes: "nic",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "45": {
      date: "2024-06-15",
      category: "fun",
      title: "logitech wheel",
      amount: 250.46,
      notes: "g29 ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "46": {
      date: "2024-06-15",
      category: "transport",
      title: "car detailing equip",
      amount: 66.25,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "47": {
      date: "2024-06-16",
      category: "food",
      title: "korean shi",
      amount: 37.69,
      notes: "zion market",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "48": {
      date: "2024-06-15",
      category: "food",
      title: "target",
      amount: 16.25,
      notes: "forgot",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "49": {
      date: "2024-06-16",
      category: "food",
      title: "HMART",
      amount: 15.28,
      notes: "some shit",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "50": {
      date: "2024-06-16",
      category: "fun",
      title: "ebisu japan market",
      amount: 6.35,
      notes: "cup",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "51": {
      date: "2024-06-16",
      category: "transport",
      title: "gasssss",
      amount: 24.19,
      notes: "quick trip",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "52": {
      date: "2024-06-16",
      category: "transport",
      title: "qjuiktrip",
      amount: 10.48,
      notes: "idk",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "53": {
      date: "2024-06-17",
      category: "fun",
      title: "quiktrip zyn",
      amount: 11.85,
      notes: "ztn",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "54": {
      date: "2024-06-18",
      category: "living",
      title: "Kroger ",
      amount: 27.77,
      notes: "Yerb + melatonin",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "55": {
      date: "2024-06-21",
      category: "fun",
      title: "Bumfuckery",
      amount: 100.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "56": {
      date: "2024-06-21",
      category: "transport",
      title: "⛽️ ",
      amount: 45.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "57": {
      date: "2024-06-23",
      category: "fun",
      title: "GOHAN market",
      amount: 36.64,
      notes: "lil treat",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "58": {
      date: "2024-06-23",
      category: "food",
      title: "H Mart",
      amount: 24.05,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "59": {
      date: "2024-06-23",
      category: "food",
      title: "Gimbap ",
      amount: 7.45,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "60": {
      date: "2024-06-23",
      category: "food",
      title: "Target groceries",
      amount: 40.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "61": {
      date: "2024-06-24",
      category: "fun",
      title: "Zyn",
      amount: 9.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "62": {
      date: "2024-06-28",
      category: "food",
      title: "Groceries",
      amount: 21.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "63": {
      date: "2024-06-29",
      category: "transport",
      title: "Jack",
      amount: 155.5,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "64": {
      date: "2024-06-29",
      category: "transport",
      title: "Auto Zone",
      amount: 48.62,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "65": {
      date: "2024-06-29",
      category: "transport",
      title: "Home Depot mask",
      amount: 5.0,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "66": {
      date: "2024-06-29",
      category: "transport",
      title: "Wax and grease remover",
      amount: 20.68,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "67": {
      date: "2024-06-29",
      category: "transport",
      title: "Rubbing compound",
      amount: 15.55,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
    "68": {
      date: "2024-06-29",
      category: "transport",
      title: "Another fuckin rattlecan ",
      amount: 37.3,
      notes: " ",
      session_id: "2024-07-06 19:35:53.004719-07:00",
    },
  };
  const months = ["ALL", "2024-06", "2024-07"];

  const monthlyTotals = [
    { category: "food", amount: 715.4 },
    { category: "fun", amount: 915.81 },
    { category: "living", amount: 1239.78 },
    { category: "transport", amount: 501.8 },
  ];
  // MOCK HANDLER
  /////////////

  return (
    <>
      <TopBar userName="TEST" />
      <ExpenseSummary
        months={months}
        onMonthClick={handleMonthClick}
        heights={heights}
        sum={month}
        monthlyTotals={monthlyTotals}
      />
      <NewExpenseForm onSubmit={handleFormSubmit} />
      <AllExpensesView
        data={expenses}
        onRowClick={(index, title) => console.log(index, title)}
        onDeleteButtonClick={(index, title) =>
          alert(["mock delete", index, title])
        }
        onRefreshButtonClick={() => alert("Refresh clicked")}
      />
    </>
  );
}

export default App;

