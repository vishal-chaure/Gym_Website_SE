import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import Navbar from "./navbar/Navbar";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

const HeroSection = () => {

     const links = [
          {
            title: "Home",
            icon: (
              <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
      
          {
            title: "Products",
            icon: (
              <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
          {
            title: "Components",
            icon: (
              <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
          {
            title: "Aceternity UI",
            icon: (
              <Image
                src="https://assets.aceternity.com/logo-dark.png"
                width={20}
                height={20}
                alt="Aceternity Logo"
              />
            ),
            href: "#",
          },
          {
            title: "Changelog",
            icon: (
              <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
      
          {
            title: "Twitter",
            icon: (
              <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
          {
            title: "GitHub",
            icon: (
              <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
          },
        ];

  return (
      <div
        className="relativ h-full w-full rounded-2xl"
      >
        <Navbar />
        
      </div>
  )
}

export default HeroSection


// background image 
// https://img.freepik.com/premium-photo/discipline-wallpaper-motivation-gym-business-wall_1279815-10915.jpg

