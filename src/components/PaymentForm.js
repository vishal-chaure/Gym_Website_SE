import React, { useState } from "react";

const PaymentForm = ({ handlePayment }) => {
  const [plan, setPlan] = useState("");
  const [duration, setDuration] = useState(1); // Default duration: 1 month
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plan || !duration) {
      setError("Please select a plan and duration.");
      return;
    }

    try {
      await handlePayment({ plan, duration });
    } catch (err) {
      setError("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="plan">Select Plan</label>
        <select id="plan" onChange={(e) => setPlan(e.target.value)} value={plan}>
          <option value="">Select a plan</option>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <div>
        <label htmlFor="duration">Select Duration (months)</label>
        <select
          id="duration"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        >
          {[1, 3, 6, 9, 12].map((month) => (
            <option key={month} value={month}>
              {month} months
            </option>
          ))}
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;