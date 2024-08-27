import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeEmployee, selectEmployeeById } from "../../redux/EmployeesSlice";
import UserMaleSVG from "../../assets/userMale.svg";
import UserFemaleSVG from "../../assets/userFemale.svg";
import { useEffect, useState } from "react";
import { showNotification } from "../../redux/NotificationSlice";
import DeleteSVG from "../../assets/deleteIcon.svg";
import UpdateSVG from "../../assets/updateIcon.svg";
import { data } from "../../mockdata";

export const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector((state: RootState) =>
    selectEmployeeById(state, +id!)
  );
  const [rotation, setRotation] = useState<number>(0);

  //Img rotating according to mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const mouseX = event.clientX;
      const rotationAngle = (mouseX / windowWidth - 0.2) * 100;

      setRotation(rotationAngle > 40 ? 40 : rotationAngle);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleRemove = () => {
    // Mock data delete request wont work!
    if (data.find((x) => x.id === employee!.id)) {
      dispatch(showNotification("MOCK DATA! Employee can not deleted!"));
      return;
    }
    dispatch(removeEmployee(employee!.id));
    dispatch(showNotification("Employee deleted successfully!"));
    navigate("/");
  };
  const handleUpdate = () => {
    // Mock data update wont work!
    if (data.find((x) => x.id === employee!.id)) {
      dispatch(showNotification("MOCK DATA! Employee can not updated!"));
      return;
    }
    navigate(`/updatePerson/${employee!.id}`);
  };
  return (
    <div className="w-full px-10 max-w-[1280px] m-auto">
      <p className="font-semibold text-[28px] mb-8 flex">Employee Detail</p>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full ">
        {employee && (
          <>
            <div className="img-container">
              <img
                className="img w-[200px] h-[200px] rounded-full border border-gray"
                src={employee.gender === "Male" ? UserMaleSVG : UserFemaleSVG}
                alt="Rotating"
                style={{ transform: `rotateY(${rotation}deg)` }}
              />
              <div
                onClick={handleRemove}
                className="img-overlay-delete w-[200px] h-[100px] rounded-b-full cursor-pointer"
              >
                <span className="delete-icon">
                  <img className="w-12" src={DeleteSVG} />
                </span>
              </div>
              <div
                onClick={handleUpdate}
                className="img-overlay-update w-[200px] h-[100px] rounded-t-full cursor-pointer"
              >
                <span className="update-icon">
                  <img className="w-12" src={UpdateSVG} />
                </span>
              </div>
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
              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-mainBlue text-white px-4 py-2 mb-6 float-end rounded-lg whitespace-nowrap hover:shadow-md hover:opacity-80"
                >
                  Update
                </button>
                <button
                  onClick={handleRemove}
                  className="bg-[#ff0000b3] text-white px-4 py-2 mb-6 float-end rounded-lg whitespace-nowrap hover:shadow-md hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
