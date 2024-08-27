import { useNavigate } from "react-router-dom";
import { User } from "../../Types/types";
import UserMaleSVG from "../../assets/userMale.svg";
import UserFemaleSVG from "../../assets/userFemale.svg";

interface CardProps {
  employee: User;
}
export const Card = ({ employee }: CardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`detail/${employee.id}`)}
      className="border cursor-pointer hover:shadow-md border-gray rounded-lg flex gap-4 p-4 flex-col md:flex-row items-center md:items-start"
    >
      <div className="img-container">
        <img
          className=" min-w-[200px] w-[200px] rounded-full border border-gray"
          src={employee.gender === "Male" ? UserMaleSVG : UserFemaleSVG}
        />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-fit">
        <p>
          <span className="font-semibold">Name: </span>
          {employee.name}
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          {employee.email}
        </p>
        <p>
          <span className="font-semibold">Role: </span>
          {employee.role}
        </p>
        <p>
          <span className="font-semibold">Subscription: </span>
          {employee.subscription ? "Subscribe" : "-"}
        </p>
        <p>
          <span className="font-semibold">Gender: </span>
          {employee.gender}
        </p>
      </div>
    </div>
  );
};
