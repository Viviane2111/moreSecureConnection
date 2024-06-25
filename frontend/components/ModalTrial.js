import Link from "next/link";
import {useState} from "react";
import Header from "./Header";

const ModalTrial = () => {
  return (
    <div>
      <div className=" bg-slate-600 text-white">
        <Header />
      </div>
      <Link href="/">
        <div className="text-center mt-10">
          <span className="text-center cursor-pointer mr-2">⏮</span> 
          My new page
        </div>
      </Link>
    </div>
  );
};
export default ModalTrial;
