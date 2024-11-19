import { connectToDatabase } from "../../utils/db"; // Assuming db connection utility
import Payment from "../../models/Payment"; // Assuming Payment is a mongoose model

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { plan, duration, userId, amount } = req.body;

    if (!plan || !duration || !userId || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Connect to DB
      await connectToDatabase();

      // Create a new payment record
      const payment = new Payment({
        userId,
        plan,
        duration,
        amount,
        status: "success",
        transactionId: `TXN-${Date.now()}`,
      });

      // Save payment to database
      await payment.save();

      res.status(201).json({ message: "Payment successful", payment });
    } catch (error) {
      res.status(500).json({ message: "Payment failed", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}