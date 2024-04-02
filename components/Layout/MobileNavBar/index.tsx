"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import React, { useState, useMemo, useEffect } from "react";
import CrossIcon from "../../../public/img/icons/cross.svg";
import { Links, SocialButtons } from "~/components/Layout/Nav/Navbar";
import { WalletConnector } from "~/components/Layout/WalletConnect/WalletConnectButton";
import { UIconfig } from "~/config/UIconfig";

const BurgerIcon = ({ setIsActive, isActive }: { isActive: boolean; setIsActive: () => void }) => {
  const topVariants = {
    active: { rotate: 45, translateY: 0 },
    inactive: { rotate: 0, translateY: 0 }
  };

  const middleVariants = {
    active: { opacity: 0 },
    inactive: { opacity: 1 }
  };

  const bottomVariants = {
    active: { rotate: -45, translateY: 0 },
    inactive: { rotate: 0, translateY: 0 }
  };
  const bgColor = false ? "bg-gray" : "bg-white";

  return (
    <div
      key={"burger-menu"}
      onClick={() => setIsActive()}
      style={{
        zIndex: isActive ? 111 : 0
      }}
      className={`relative cursor-pointer shadow-md lg:hidden`}
    >
      <motion.div
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        variants={topVariants}
        className={`${bgColor} mb-1 h-1 w-6`}
      ></motion.div>
      <motion.div
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        variants={middleVariants}
        className={`${bgColor} k mb-1 h-1 w-6`}
      ></motion.div>
      <motion.div
        initial="inactive"
        animate={isActive ? "active" : "inactive"}
        variants={bottomVariants}
        className={`${bgColor} h-1 w-6`}
      ></motion.div>
    </div>
  );
};

function MobileNavBar() {
  const path = usePathname();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isOpen, toggleOpen] = useCycle(true, false);

  const openMenu = () => {
    setIsActive(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsActive(false);
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setIsActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    return () => closeMenu();
  }, [path]);

  return (
    <AnimatePresence>
      {!isActive ? (
        <BurgerIcon
          setIsActive={openMenu}
          isActive={isActive}
        />
      ) : null}
      <motion.div
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.1 }}
        key={"mobile-nav-2"}
        initial={{
          opacity: 0,
          height: "100svh",
          width: "100%",
          x: 100
        }}
        animate={{
          opacity: 1,
          x: isActive ? 0 : 1000
        }}
        style={{
          zIndex: isOpen ? 3 : 100,
          background: UIconfig.mobileNavBar.bg
        }}
        className="flex-column fixed right-0 top-0 z-20 flex w-full flex-col overflow-hidden pb-8 pl-8 pr-8 pt-6 sm:max-w-sm lg:hidden"
      >
        <div className="mb-8"></div>
        <div
          onClick={() => {
            toggleOpen();
            closeMenu();
          }}
          className="z-2000 absolute right-8 top-8 flex h-[20px] w-[20px] cursor-pointer items-center justify-center"
        >
          <CrossIcon className="size-5" />
        </div>
        <nav
          className="flex h-full w-full flex-col items-center justify-items-start gap-4 pt-4 text-white sm:items-end">
          <WalletConnector />
          <ul className="flex flex-1 flex-col items-center gap-y-6 text-[20px]">
            <Links />
          </ul>
          <ul className="flex items-center gap-x-6">
            <SocialButtons />
          </ul>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}

export default MobileNavBar;
