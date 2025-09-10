import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:4000/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    const res = await axios.post("http://localhost:4000/expenses", expense);
    setExpenses([res.data, ...expenses]);
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:4000/expenses/${id}`);
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <AddExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
}
