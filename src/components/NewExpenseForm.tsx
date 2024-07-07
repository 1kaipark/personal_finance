import React, { useState } from "react";

interface Props {
  onSubmit: (formData: {
    date: string;
    category: string;
    title: string;
    amount: string;
    notes: string;
  }) => void;
}

const NewExpenseForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    title: "",
    amount: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior

    // Check if required fields are filled
    if (
      !formData.date ||
      !formData.category ||
      !formData.title ||
      !formData.amount
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    console.log("Form submitted with data:", formData);
    onSubmit(formData);
    // You can perform further actions like sending data to server or processing here
    // Example: Reset the form after submission
    setFormData({
      date: "",
      category: "",
      title: "",
      amount: "",
      notes: "",
    });
  };

  return (
    <div className="container-fluid">
      <h1 className="header">new expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">
              category
            </label>
            <select
              id="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">choose...</option>
              <option value="fun">FUN</option>
              <option value="education">EDUCATION</option>
              <option value="transport">TRANSPORT</option>
              <option value="food">FOOD</option>
              <option value="living">LIVING</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">
              amount
            </label>
            <div className="input-group flex-nowrap">
                <span className="input-group-text" id='addon-wrapping'>$</span>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                // style={{height: "2.2rem"}}
              />
            </div>
          </div>

          <label htmlFor="notes">
            notes
          </label>
          <input
            type="text"
            className="form-control"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-info"
          >
            ADD EXPENSE
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewExpenseForm;
