import DataTable from "react-data-table-component";
import { User } from "../../Types/types";
import { useNavigate } from "react-router-dom";

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

interface TableProps {
  tableData: User[];
}

export const Table = ({ tableData }: TableProps) => {
  const navigate = useNavigate();

  // Creating datas for datatable

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
    <DataTable
      columns={columns}
      data={tableData}
      pagination
      conditionalRowStyles={conditionalRowStyles}
      onRowClicked={handleRowClick}
    />
  );
};
