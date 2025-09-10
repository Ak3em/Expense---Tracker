import React from "react";

export default function ExpenseList({ expenses, deleteExpense }) {
  return (
    <ul>
      {expenses.map((e) => (
        <li key={e.id}>
          {e.title} - ${e.amount} ({e.category})
          <button onClick={() => deleteExpense(e.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
