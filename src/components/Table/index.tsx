/* eslint-disable react-refresh/only-export-components */
import DataTable from "react-data-table-component";
import { User } from "../../Types/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    subscription: true,
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "HR",
    subscription: false,
    gender: "Female",
  },
];

// Data table columns
const columns = [
  {
    name: "ID",
    selector: (row: User) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: User) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: User) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: User) => row.role,
    sortable: true,
  },
  {
    name: "Subscription",
    selector: (row: User) => (row.subscription ? "True" : "False"),
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row: User) => row.gender,
    sortable: true,
  },
];

export const Table = () => {
  const [search, setSearch] = useState("");
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Creating datas for datatable
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

  const handleRowClick = (row: User) => {
    navigate(`/detail/${row.id}`);
  };

  // Hover effect
  const conditionalRowStyles = [
    {
      when: () => true, // Condition: Every time
      style: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#e0f7fa",
          borderRadius: "5px",
        },
      },
    },
  ];
  return (
    <div className="">
      <h1 className=" align-middle font-semibold text-[28px] mb-8">
        Employee List
      </h1>

      <Input
        className="mb-2"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />

      <DataTable
        columns={columns}
        data={[...filteredEmployees, ...filteredData]}
        pagination
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={handleRowClick}
      />
      <button
        onClick={() => navigate("/addEmployee")}
        className="bg-mainBlue text-white px-4 py-2 float-end rounded-lg whitespace-nowrap"
      >
        Add
      </button>
    </div>
  );
};
