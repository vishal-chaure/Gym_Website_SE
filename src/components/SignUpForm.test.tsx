import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "./SignUpForm";

describe("SignUpForm Component", () => {
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockSetLoginStatus = jest.fn();

  beforeEach(() => {
    render(
      <SignUpForm
        handleSubmit={mockHandleSubmit}
        error={null}
        setLoginStatus={mockSetLoginStatus}
      />
    );
  });

  test("renders all input fields", () => {
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("renders the submit button", () => {
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
  });

  test("calls handleSubmit on form submission", () => {
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("displays error message when error is passed", () => {
    render(
      <SignUpForm
        handleSubmit={mockHandleSubmit}
        error="This is an error"
        setLoginStatus={mockSetLoginStatus}
      />
    );
    expect(screen.getByText("This is an error")).toBeInTheDocument();
  });

  test("calls setLoginStatus when 'Log in here' is clicked", () => {
    const loginLink = screen.getByText("Log in here");
    fireEvent.click(loginLink);
    expect(mockSetLoginStatus).toHaveBeenCalledWith("login");
  });
});