import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white px-[35px] py-5 max-[700px]:min-h-16 max-[700px]:px-5 max-[700px]:py-0 max-[380px]:px-3">
      <div className="flex items-center justify-between max-[700px]:min-h-[63px]">

        <div className="flex items-center gap-[14px] max-[380px]:gap-2">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#12704c] font-[Arial,sans-serif] text-[28px] font-extrabold text-white">H</div>

          <div className="company-info">
            <h3 className="m-0 text-[21px] font-bold text-gray-900 max-[380px]:text-sm">Employee Directory</h3>
            <p className="mt-[5px] mb-0 text-[13px] font-medium tracking-[0.4px] text-gray-500 max-[380px]:text-[10px]">HEPL Technologies</p>
          </div>
        </div>

         <nav className="flex items-center gap-5">
        <NavLink to="/" end className="rounded-lg px-[14px] py-2.5 font-semibold text-slate-600 no-underline transition-[background-color,color] duration-200 hover:bg-green-50 hover:text-[#08764f]">
          Home
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `rounded-lg px-[14px] py-2.5 font-semibold no-underline transition-[background-color,color] duration-200 ${
              isActive ? "bg-[#08764f] text-white" : "text-slate-600 hover:bg-green-50 hover:text-[#08764f]"
            }`
          }
        >
          + Add Employee
        </NavLink>
      </nav>

        <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#dbdbdb] text-[22px] font-bold text-[#6b6b6d]">HS</div>
      </div>
    </header>
  );
};

export default Header;