import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Types/types";
import { data } from "../../mockdata";

interface EmployeesState {
  employees: User[];
}

const initialState: EmployeesState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newId = state.employees.length + 3;
      const newEmployee = { id: newId, ...action.payload };
      state.employees.push(newEmployee);
    },
    updateEmployee: (state, action: PayloadAction<User>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
      }
    },
    removeEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});
export const selectEmployeeById = (
  state: { employees: EmployeesState },
  id: number
) => {
  return (
    state.employees.employees.find((employee) => employee.id === id) ||
    data.find((employee) => employee.id === id)
  );
};

export const { addEmployee, updateEmployee, removeEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
