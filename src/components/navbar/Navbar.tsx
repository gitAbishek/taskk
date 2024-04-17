import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { removeCookie } from "../../utils/cookie";
import { AUTH_COOKIE_CONFIG } from "../../constant/common";
import userImage from "../../assets/image/user-dummy.png";
import { useAuthContext } from "../../hook/contextConsumer.hooks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setIsLoggedIn } = useAuthContext();

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (
        !open ||
        (dropdownRef.current && dropdownRef.current.contains(target as Node))
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpen, open]);

  const handleClickOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen((prevValue) => !prevValue);
  };

  const handleClose = () => {
    setOpen((prevValue) => !prevValue);
  };

  const handleClickLogout = () => {
    removeCookie(AUTH_COOKIE_CONFIG.BEARER_TOKEN);
    setIsLoggedIn(false);
  };

  return (
    <div className="relative w-full flex justify-end items-center gap-5 p-5 border-[1px] border-[#E2E8F0] h-16">
      <div>
        <h1
          className={`text-[#000000] origin-left font-bold text-sm duration-300`}
        >
          City Tech
        </h1>
      </div>
      <div onClick={handleClickOpen}>
        {/* <FaUserCircle
          size={24}
          className="hover:cursor-pointer"
        /> */}
        <img src={userImage} alt="logo" className="h-8 w-8 hover:cursor-pointer"  />
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute w-32 top-16 right-5 bg-white shadow-xl rounded-lg p-1"
        >
          <ul className="flex flex-col">
            <li
              className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md"
              onClick={handleClose}
            >
              <FaUser className="text-black text-sm" />
              <NavLink to="/" className="text-black text-sm font-semibold">
                Profile
              </NavLink>
            </li>
            <li
              className="flex items-center gap-2 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md"
              onClick={handleClickLogout}
            >
              <MdLogout className="text-black text-sm font-bold" />
              <button className="text-black text-sm font-semibold">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
