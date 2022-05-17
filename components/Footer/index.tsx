import { AiOutlineGithub } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { CgLink } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t-2 border-gray-200 w-[80%] pt-5 flex-col md:flex-row flex justify-around md:justify-center items-center pb-8">
      <div className="md:w-[15%] mb-2 md:mb-0">
        <p className="text-gray-500">
          &copy; 2022-{new Date().getFullYear()} Bentility
        </p>
      </div>
      <div className="w-full md:w-[60%]  flex items-center justify-around mb-5 md:mb-0">
        <Link href={"about"}>
          <p className="text-blue-700 font-thin cursor-pointer">About</p>
        </Link>
        <Link href={"contact"}>
          <p className="text-blue-700 font-thin cursor-pointer">Contact</p>
        </Link>
        <Link href={"policy"}>
          <p className="text-blue-700 font-thin cursor-pointer">
            Privacy Policy
          </p>
        </Link>
      </div>
      <div className="w-full md:w-[25%] flex items-center justify-around text-gray-500 text-xl mb-2 md:mb-0">
        <a
          href="https://www.linkedin.com/in/shadrack-bentil-410422199"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
          title="Linked"
        >
          <GrLinkedin />
        </a>
        <a
          href="https://github.com/qbentil"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
          title="GitHub"
        >
          <AiOutlineGithub />
        </a>
        <a
          href="https://twitter.com/themanbentil"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
          title="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.buymeacoffee.com/qbentil"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
          title="Buy me a Coffee"
        >
          <BiCoffeeTogo />
        </a>
        <a
          href="https://qbentil.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
          title="Website"
        >
          <CgLink />
        </a>
      </div>
    </div>
  );
};

export default Footer;