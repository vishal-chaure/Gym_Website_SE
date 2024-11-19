import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      required: true, 
      trim: true 
    },
    planType: { 
      type: String, 
      enum: ['premium', 'standard', 'basic'], 
      required: true 
    },
    duration: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 12 
    },
    amount: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    status: { 
      type: String, 
      enum: ['success', 'failed'], 
      required: true 
    },
  },
  { 
    timestamps: true  // Automatically add createdAt and updatedAt fields 
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;