import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { username, fullname, email, password } = await req.json();

  try {
    await connect(); // Ensure this connection is successful
  } catch (error) {
    console.error("Database connection error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    username,
    fullname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.log(err)
    return new NextResponse(err, {
      status: 500,
    });
  }
};