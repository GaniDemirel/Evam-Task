import { useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input";
import { Table } from "../../components/Table";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { data } from "../../mockdata";
import { useNavigate } from "react-router-dom";
import GridIconSVG from "../../assets/gridIcon.svg";
import OrderIconSVG from "../../assets/orderIcon.svg";
import ListIconSVG from "../../assets/listIcon.svg";
import SortASC from "../../assets/sortAsc.svg";
import SortDESC from "../../assets/sortDesc.svg";
import { Card } from "../../components/Card";

export const Home = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [listType, setListType] = useState<"Card" | "Table">("Table");
  const [isOpenOrderModal, setIsOpenOrderModal] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"name" | "email" | "role">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = (criteria: "name" | "email" | "role") => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );
  const filteredEmployees = employees.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const allEmployees = [...filteredEmployees, ...filteredData];

  // sort items default by name
  const sortedEmployees = allEmployees.sort((a, b) => {
    const fieldA = a[sortBy].toLowerCase();
    const fieldB = b[sortBy].toLowerCase();

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Close filter modal when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpenOrderModal(false);
      }
    };

    if (isOpenOrderModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenOrderModal]);

  return (
    <div className="w-full px-10 max-w-[1280px] m-auto">
      <h1 className=" align-middle font-semibold text-[28px] mb-8">
        Employee List
      </h1>
      <div className="flex justify-end gap-4 w-full">
        {listType === "Card" && (
          <div className="relative">
            <img
              onClick={() => setIsOpenOrderModal(!isOpenOrderModal)}
              className="w-10 h-10 p-2 rounded-lg cursor-pointer hover:transform hover:scale-105 border border-gray"
              src={OrderIconSVG}
            />
            {isOpenOrderModal && (
              <div
                ref={modalRef}
                className="absolute  md:top-10 whitespace-nowrap z-10 left-0  cursor-pointer bg-white border border-gray rounded-lg"
              >
                <div className="flex gap-1 justify-between w-[176px] px-4 border-b border-gray py-2 hover:bg-[#e4f6ff]">
                  <p className="" onClick={() => handleSort("name")}>
                    Order by Name
                  </p>
                  {sortBy === "name" && (
                    <img
                      className="w-6"
                      src={sortOrder === "asc" ? SortASC : SortDESC}
                    />
                  )}
                </div>
                <div className="flex gap-1 justify-between w-[176px] px-4 border-b border-gray py-2 hover:bg-[#e4f6ff]">
                  <p className="" onClick={() => handleSort("email")}>
                    Order by Email
                  </p>
                  {sortBy === "email" && (
                    <img
                      className="w-6"
                      src={sortOrder === "asc" ? SortASC : SortDESC}
                    />
                  )}
                </div>
                <div className="flex gap-1 justify-between w-[176px] px-4 border-b border-gray py-2 hover:bg-[#e4f6ff]">
                  <p className="" onClick={() => handleSort("role")}>
                    Order by Role
                  </p>
                  {sortBy === "role" && (
                    <img
                      className="w-6"
                      src={sortOrder === "asc" ? SortASC : SortDESC}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <img
          onClick={() => setListType(listType === "Card" ? "Table" : "Card")}
          className="w-10 h-10 p-2 rounded-lg cursor-pointer hover:transform hover:scale-105 border border-gray"
          src={listType === "Card" ? ListIconSVG : GridIconSVG}
        />
        <Input
          className="mb-2"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {
        {
          Table: <Table tableData={allEmployees} />,
          Card: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {sortedEmployees.map((item, key) => (
                <Card key={key} employee={item} />
              ))}
            </div>
          ),
        }[listType]
      }

      <button
        onClick={() => navigate("/addEmployee")}
        className="bg-mainBlue text-white px-4 py-2 mb-6 float-end rounded-lg whitespace-nowrap hover:shadow-md hover:opacity-80"
      >
        Add
      </button>
    </div>
  );
};
