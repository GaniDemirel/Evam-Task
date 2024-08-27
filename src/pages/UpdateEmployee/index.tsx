import { useParams } from "react-router-dom";
import { EmployeeForm } from "../../components/EmployeeForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectEmployeeById } from "../../redux/EmployeesSlice";
import { CenterBackground } from "../../components/CenterBackground";

export const UpdateEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useSelector(
    (state: RootState) => selectEmployeeById(state, +id!)!
  );
  return (
    <div className="h-full overflow-hidden relative min-h-[calc(100vh-116px)]">
      <div className="w-full px-10 max-w-[1280px] m-auto">
        <CenterBackground />
        <p className="font-semibold text-[28px] mb-8 flex">Update Employee</p>
        <div className="flex flex-col lg:flex-row gap-8 pb-8">
          <EmployeeForm employee={employee} />
        </div>
      </div>
    </div>
  );
};
