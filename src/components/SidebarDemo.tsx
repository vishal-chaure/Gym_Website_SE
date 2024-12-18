"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useModal, useOutsideClick } from "../components/ui/animated-modal";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger
} from "../components/ui/animated-modal";
import {
  IconHeartRateMonitor,
  IconScale,
  IconRun,
  IconBarbell,
  IconArrowLeft,
  IconArrowRight,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconCreditCard,
  IconClipboardCheck,
  IconBell,
  IconHelp,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import DashboardContent from "./DashboardContent";
import ProfileContent from "./ProfileContent";
import PaymentContent from "./PaymentContent";
import FitnessPlansContent from "./FitnessPlansContent";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useClose } from "@/app/store/useStore";
import SignUpForm from "./SignUpForm";


export function SidebarDemo() {

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   href: "#",
    //   icon: (
    //     <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
  ];

  const [open, setOpen] = useState(false);
  const {close, setClose} = useClose();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState('signup');
  // const session = useSession();
  const { setOpen: setModalOpen , open: Open} = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useOutsideClick(modalRef, () => setOpen(false));

  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  const handleSignUp = () => {
    // Trigger the callback when "Sign Up" button is clicked
    closeModal();
  };
  

  useEffect(() => {
    
    if (sessionStatus === "authenticated") {
      console.log("and here we go")
      const userId = session.user?.email ;
      console.log("User ID:", userId);
      toast('Logged in Successfull');
      closeModal();
      setClose(true);
    }

  }, [sessionStatus, router]);

  const notify = () => toast('Here is your toast.');



  const link = isLoggedIn
    ? {
      label: 'Logout',
      href: '#logout',
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    }
    : {
      label: 'Login',
      href: '#login',
      icon: (
        <IconArrowRight className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    };

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    const username = e.target[0].value;
    const fullname = e.target[1].value;
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
          username,
          fullname,
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
        toast('Registration Done. Login Again');
        setLoginStatus('login')
        // router.push("/trials");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }

  };

  const handleSubmitLogin = async (e: any) => {

    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res) {
      console.log("logged in")
    }

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }

  };

  

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardContent />;
      case 'profile':
        return <ProfileContent />;
      case 'payment':
        return <PaymentContent />;
      case 'notification':
        return <FitnessPlansContent />;
      case 'home':
        return <HeroSection />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-00 dark:bg-neutral-900 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen overflow-y-auto scrollbar-hide" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo setCurrentView={() => setCurrentView('home')} /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "Dashboard",
                  href: "#",
                  icon: (
                    <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                  onClick: () => {
                    if (session) {
                      setCurrentView('dashboard');
                    } else {
                      toast("Login to see Your Dashboard");
                    }
                  },
                }}
              />
              
              <SidebarLink
                link={
                  {
                    label: "Profile",
                    href: "#",
                    icon: (
                      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('profile'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Fitness Plans & Payments",
                    href: "#",
                    icon: (
                      <IconCreditCard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('payment'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Notifications",
                    href: "#",
                    icon: (
                      <IconBell className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('notification'),
                  }
                }
              />
              <SidebarLink
                link={
                  {
                    label: "Help & Support",
                    href: "#",
                    icon: (
                      <IconHelp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                    ),
                    onClick: () => setCurrentView('help'),
                  }
                }
              />
              
              <Modal >
                {!session ? (
                  <>
                    <ModalTrigger className="text-neutral-700 dark:text-neutral-200 h-50 w-50 pl-0 mt-0 flex-shrink-0">
                      <SidebarLink link={
                        {
                          label: 'Login',
                          href: '#login',
                          icon: (
                            <IconArrowRight className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                          ),
                        }
                      } />
                    </ModalTrigger>
                  </>
                ) : (
                  <div onClick={()=>{
                    toast('Logging Out .....');
                    signOut();
                  }}>
                    <SidebarLink link={
                        {
                          label: 'Logout',
                          href: '#logout',
                          icon: (
                            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                          ),
                        }
                      } />
                  </div>
                )}
                <ModalBody >
                  <ModalContent>
                    <h4 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                      Hey, Welcome to{" "}
                      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        Muscle Buzz Fitness
                      </span>{" "}
                      - Let's get started!
                    </h4>
                    <div className="flex justify-center items-center">

                    </div >
                    {/* Form Compo */}

                    {
                      loginStatus === 'signup'
                        ?
                        <SignUpForm 
                          handleSubmit={handleSubmit} 
                          error={error} 
                          setLoginStatus={setLoginStatus} 
                        />
                        :
                        <form className="my-2" onSubmit={handleSubmitLogin}>
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
                            Sign in &rarr;
                            <BottomGradient />
                          </button>

                          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 my-5 h-[1px] w-full" />
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-1">
                            Are You New ?{" "}
                            <a href="#" className="text-sky-400 hover:underline" onClick={() => setLoginStatus("signup")}>
                              Sign Up Here
                            </a>
                          </p>
                        </form>
                    }
                  </ModalContent>
                </ModalBody>
              </Modal >
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Vishal Chaure",
                href: "#",
                icon: (
                  <Image
                    src="/me.jpg"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard renderContent={renderContent} />
    </div>
  );
}
interface LogoProps {
  setCurrentView: () => void;
}
export const Logo: React.FC<LogoProps> = ({ setCurrentView }) => {
  return (
    <div
      onClick={setCurrentView}
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBarbell size={25} stroke={1.5} color="white" className=" rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MUSCLE BUZZ FITNESS
      </motion.span>
    </div>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconBarbell size={25} stroke={1.5} color="white" />
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
    </Link>
  );
};



// Dummy dashboard component with content
// Define the props type for the Dashboard component
interface DashboardProps {
  renderContent: () => React.ReactNode; // Specify the type of renderContent
}

const Dashboard: React.FC<DashboardProps> = ({ renderContent }) => {
  return (
    <div className="flex flex-1">
      <div className="overflow-y-auto scrollbar-hide p-2 md:p-3  rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 flex flex-col gap-2 flex-1 w-full h-full">
        {renderContent()}
      </div>
    </div>
  );
};


// For Modal 


const PlaneIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};


// For Sign In Page 

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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

