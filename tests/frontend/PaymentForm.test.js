import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PaymentForm from "../../src/components/PaymentForm";

// Mocking the handlePayment function
const mockHandlePayment = jest.fn();

describe("PaymentForm", () => {
  it("renders the payment form correctly", () => {
    render(<PaymentForm handlePayment={mockHandlePayment} />);

    expect(screen.getByLabelText(/select plan/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select duration/i)).toBeInTheDocument();
    expect(screen.getByText(/pay/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<PaymentForm handlePayment={mockHandlePayment} />);

    fireEvent.change(screen.getByLabelText(/select plan/i), {
      target: { value: "basic" },
    });
    fireEvent.change(screen.getByLabelText(/select duration/i), {
      target: { value: 3 },
    });

    fireEvent.click(screen.getByText(/pay/i));

    await waitFor(() => {
      expect(mockHandlePayment).toHaveBeenCalledWith({
        plan: "basic",
        duration: "3",
      });
    });
  });

  it("shows an error if no plan or duration is selected", async () => {
    render(<PaymentForm handlePayment={mockHandlePayment} />);

    fireEvent.click(screen.getByText(/pay/i));

    await waitFor(() => {
      expect(screen.getByText(/please select a plan and duration/i)).toBeInTheDocument();
    });
  });

  it("shows an error if payment fails", async () => {
    mockHandlePayment.mockRejectedValueOnce(new Error("Payment failed"));

    render(<PaymentForm handlePayment={mockHandlePayment} />);

    fireEvent.change(screen.getByLabelText(/select plan/i), {
      target: { value: "premium" },
    });
    fireEvent.change(screen.getByLabelText(/select duration/i), {
      target: { value: 6 },
    });

    fireEvent.click(screen.getByText(/pay/i));

    await waitFor(() => {
      expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
    });
  });
});