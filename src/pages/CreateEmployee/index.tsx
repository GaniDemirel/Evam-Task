import { CenterBackground } from "../../components/CenterBackground";
import { EmployeeForm } from "../../components/EmployeeForm";

export const CreateEmployee = () => {
  return (
    <div className="h-full overflow-hidden relative min-h-[calc(100vh-116px)]">
      <div className="w-full px-10 max-w-[1280px] m-auto">
        <CenterBackground />
        <p className="font-semibold text-[28px] mb-8 flex">Add Employee</p>
        <div className="flex flex-col lg:flex-row gap-8 pb-8">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
};
