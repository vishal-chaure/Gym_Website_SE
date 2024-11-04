import React, { useState } from 'react'
import {
     Modal,
     ModalBody,
     ModalContent,
     ModalFooter,
     ModalTrigger,
   } from "../components/ui/animated-modal";
import { cn } from "@/lib/utils";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";


const SignUp = () => {
     const [open, setOpen] = useState(false);
     const [isLoggedIn, setIsLoggedIn] = useState(true);
     const [currentView, setCurrentView] = useState('home');
     const [error, setError] = useState("");

     const isValidEmail = (email: string) => {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return emailRegex.test(email);
        };
    
      const handleSubmit = async(e: any) => {
    
          e.preventDefault();
          const firstName = e.target[0].value;
          const lastName = e.target[1].value;
          const email = e.target[2].value;
          const password = e.target[3].value;
    
          if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
          }
    
          if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
          }
    
          try {
            const res = await fetch("/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
              }),
            });
            if (res.status === 400) {
              setError("This email is already registered");
            }
            if (res.status === 500) {
              setError("username is already taken !");
            }
            if (res.status === 200) {
              setError("");
              // router.push("/trials");
            }
          } catch (error) {
            setError("Error, try again");
            console.log(error);
          }
          
      };

      
  return (
    <>
     <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Hey, Welcome to{" "}
                    <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                     Muscle Buzz Fitness
                    </span>{" "}
                    - Let's get started!
                  </h4>
                    <div className="flex justify-center items-center">
                      
                    </div>
                    {/* Form Compo */}
                    <form className="my-2" onSubmit={handleSubmit}>
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" placeholder="Johndoe25" type="text" />
                        </LabelInputContainer>
                        <LabelInputContainer>
                          <Label htmlFor="fullname">Your name </Label>
                          <Input id="fullname" placeholder="John Doe" type="text" />
                        </LabelInputContainer>
                      </div>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="example@gmail.com" type="email" />
                        
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                      </LabelInputContainer>

                      <p className="text-red-500 text-center my-2">{error && error}</p>
                      <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                      >
                        Sign up &rarr;
                        <BottomGradient />
                      </button>

                      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 my-5 h-[1px] w-full" />
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-1">
                        Already a member ?{" "}
                        <a href="#" className="text-sky-400 hover:underline">
                          Log in here
                        </a>
                      </p>
                    </form>
    </>
  )
}

export default SignUp

const LabelInputContainer = ({
     children,
     className,
   }: {
     children: React.ReactNode;
     className?: string;
   }) => {
     return (
       <div className={cn("flex flex-col space-y-2 w-full", className)}>
         {children}
       </div>
     );
};

const BottomGradient = () => {
     return (
          <>
          <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </>
     );
};
   
   