import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../Types/types";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addEmployee, updateEmployee } from "../../redux/EmployeesSlice";
import UserMaleSVG from "../../assets/userMale.svg";
import UserFemaleSVG from "../../assets/userFemale.svg";
import { showNotification } from "../../redux/NotificationSlice";
import Skeleton from "react-loading-skeleton";

interface EmployeeFormProps {
  employee?: User;
}

export const EmployeeForm = ({ employee }: EmployeeFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>({
    mode: "onBlur",
    defaultValues: employee || {
      name: "",
      email: "",
      role: undefined,
      gender: undefined,
      subscription: false,
    },
  });

  const formData = watch();
  //data check for review section
  const hasData =
    formData.name ||
    formData.email ||
    formData.role ||
    formData.gender ||
    formData.subscription;

  // Redux process on submit form
  const onSubmit: SubmitHandler<User> = (data) => {
    if (employee) {
      dispatch(updateEmployee({ ...employee, ...data }));
      dispatch(showNotification("Employee updated successfully!"));
      navigate(`/detail/${employee.id}`);
    } else {
      dispatch(addEmployee(data));
      dispatch(showNotification("Employee added successfully!"));
      navigate("/");
    }
  };

  return (
    <>
      <form
        className="flex flex-col w-full max-w-[500px] gap-4 px-6 py-10 border bg-white border-gray rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex items-center">
            <label className="w-full">Name:</label>
            <Input
              className="w-full"
              type="text"
              register={register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="float-end text-red-600 text-[10px]">
              {errors.name.message}!
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <label className="w-full">Email:</label>
            <Input
              type="email"
              className="w-full"
              register={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="float-end text-red-600 text-[10px]">
              {errors.email.message}!
            </p>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <label className="w-full">Role:</label>
            <select
              className="float-end border rounded-lg border-gray h-10 px-2 w-full"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Intern">Intern</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
            </select>
          </div>
          {errors.role && (
            <p className="float-end text-red-600 text-[10px]">
              {errors.role.message}!
            </p>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-full">Subscription:</label>
          <div className="w-full">
            <Input
              className="!float-start"
              type="checkbox"
              register={register("subscription")}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <label className="w-full">Gender:</label>
            <div className="flex flex-col float-end w-full">
              <label className="flex items-center gap-1">
                <Input
                  type="radio"
                  value="Male"
                  register={register("gender", {
                    required: "Gender is required",
                  })}
                />
                Male
              </label>
              <label className="flex items-center gap-1">
                <Input
                  type="radio"
                  value="Female"
                  register={register("gender", {
                    required: "Gender is required",
                  })}
                />
                Female
              </label>
            </div>
          </div>
          {errors.gender && (
            <p className="float-end text-red-600 text-[10px]">
              {errors.gender.message}!
            </p>
          )}
        </div>

        <button
          className="bg-mainBlue px-5 py-2 rounded-lg text-white hover:shadow-md hover:opacity-80"
          type="submit"
        >
          Submit
        </button>
      </form>
      {hasData && (
        <div className="w-full max-w-[500px] bg-white p-8 border border-gray rounded-lg md:h-[318px]">
          <div className="flex flex-col md:flex-row items-center md:items-start pb-10 md:pb-0 gap-4">
            <img
              className="w-[168px] h-[168px]"
              src={formData.gender === "Female" ? UserFemaleSVG : UserMaleSVG}
            />
            <div className="pt-10 flex flex-col gap-4 w-full">
              <p className="flex items-center">
                <span className="font-semibold max-w-[110px] w-full">
                  Name:
                </span>
                {formData.name ? (
                  <span>{formData.name}</span>
                ) : (
                  <Skeleton containerClassName="w-full" height={20} />
                )}
              </p>
              <p className="flex items-center">
                <span className="font-semibold max-w-[110px] w-full">
                  Email:
                </span>
                {formData.email ? (
                  <span>{formData.email}</span>
                ) : (
                  <Skeleton containerClassName="w-full" height={20} />
                )}
              </p>
              <p className="flex items-center">
                <span className="font-semibold max-w-[110px] w-full">
                  Role:
                </span>
                {formData.role ? (
                  <span>{formData.role}</span>
                ) : (
                  <Skeleton containerClassName="w-full" height={20} />
                )}
              </p>
              <p className="flex items-center">
                <span className="font-semibold max-w-[110px] w-full">
                  Subscription:
                </span>
                {formData.subscription ? (
                  <span>Subscribe</span>
                ) : (
                  <span>-</span>
                )}
              </p>
              <p className="flex items-center">
                <span className="font-semibold max-w-[110px] w-full">
                  Gender:
                </span>
                {formData.gender ? (
                  <span>{formData.gender}</span>
                ) : (
                  <Skeleton containerClassName="w-full" height={20} />
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
