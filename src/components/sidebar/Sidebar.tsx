import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { useLocation, NavLink } from "react-router-dom";
import { menu } from "../../constant/menu";
import logo from "../../assets/image/citytech-logo.png";

interface SubMenuProps {
  id: number;
  name: string;
  href: string;
}

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const [dropDown, setDropDown] = useState<{ [key: number]: boolean }>({});
  const [filterId, setFilterId] = useState(0);
  const [filterData, setFilterData] = useState<SubMenuProps[] | undefined>();
  const router = useLocation();

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      const newDropDownState: { [key: number]: boolean } = {};
      for (const key in dropDown) {
        if (Object.prototype.hasOwnProperty.call(dropDown, key)) {
          newDropDownState[parseInt(key)] = false;
        }
      }
      setDropDown(newDropDownState);
    }
  };

  const handleClickDropDown = (id: number) => {
    setFilterId(id);
    setDropDown((prevState) => ({
      ...prevState,
      [id]: prevState[id] ? false : true,
    }));
    const selectedItem = menu.find((item) => item.id === id);
    if (selectedItem && selectedItem.subMenu) {
      if (filterId === id && dropDown[id]) {
        setDropDown((prevState) => ({
          ...prevState,
          [id]: false,
        }));
        setFilterData([]);
      } else {
        setFilterData(selectedItem.subMenu);
      }
    } else {
      setFilterData([]);
    }
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-[#0D171E] p-5 pt-6 shadow-xl duration-300  h-screen  relative`}
    >
      <div
        className={`absolute flex justify-center items-center cursor-pointer -right-3 top-6 rounded-md h-8 w-8 border-2 border-none bg-[#313640] z-[100]  ${
          open ? "" : "rotate-180"
        }`}
        onClick={() => handleOpen()}
      >
        <IoIosArrowBack color="#fff" />
      </div>
      <div className="flex  items-center">
        <img src={logo} alt="logo" className="h-8 w-8" />

        {/* <h1
          className={`text-[#E2E8F0] origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          CityTech
        </h1> */}
      </div>

      <ul className="pt-9">
        {menu.map((item) => (
          <>
            <li
              key={item.id}
              className={`text-[#E2E8F0]  flex flex-col  justify-between gap-x-4 cursor-pointer p-2 hover:bg-[#313640] rounded-md ${
                item.gap ? "mt-9" : "mt-2"
              } ${router.pathname === item.href ? "bg-[#313640] " : ""} `}
            >
              {item.subMenu && item.subMenu ? (
                <div
                  className="flex justify-between items-center"
                  onClick={() => handleClickDropDown(item.id)}
                >
                  <div className="flex items-center gap-x-4 ">
                    <span className="text-xl">{item.src}</span>
                    <span
                      className={`${
                        !open && "scale-0 hidden"
                      } origin-left duration-200`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <span className={`${!open && "scale-0 hidden"}`}>
                    <IoIosArrowDown />
                  </span>
                </div>
              ) : (
                <NavLink
                  to={item.href}
                  className={`flex justify-between items-center `}
                  onClick={() => handleClickDropDown(item.id)}
                >
                  <div className="flex items-center gap-x-4 ">
                    <span className="text-xl">{item.src}</span>
                    <span
                      className={`${
                        !open && "scale-0 hidden"
                      } origin-left duration-200`}
                    >
                      {item.name}
                    </span>
                  </div>
                </NavLink>
              )}

              {dropDown && item.id === filterId && (
                <ul
                  className={`pt-2 pl-8 flex flex-col gap-1 ${
                    router.pathname === item.href ? "bg-[#313640]" : ""
                  }`}
                >
                  {filterData?.map((item) => (
                    <li key={item.id}>
                      <NavLink to={item.href} className="flex gap-x-4">
                        <span
                          className={`${
                            !open && "scale-0 hidden"
                          } origin-left duration-200 text-[#94A3B8] text-[15px]`}
                        >
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
