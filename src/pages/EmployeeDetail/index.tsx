import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeEmployee, selectEmployeeById } from "../../redux/EmployeesSlice";
import UserSVG from "../../assets/user.svg";
import { useEffect, useState } from "react";
import { showNotification } from "../../redux/NotificationSlice";
import { data } from "../../components/Table";
import DeleteSVG from "../../assets/deleteIcon.svg";
import UpdateSVG from "../../assets/updateIcon.svg";

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
      dispatch(showNotification("Employee can not deleted!"));
      return;
    }
    dispatch(removeEmployee(employee!.id));
    dispatch(showNotification("Employee deleted successfully!"));
    navigate("/");
  };
  const handleUpdate = () => {
    // Mock data update wont work!
    if (data.find((x) => x.id === employee!.id)) {
      dispatch(showNotification("Employee can not updated!"));
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
            <div className="img-container w-[200px] h-[200px] rounded-full border border-gray">
              <img
                className="img"
                src={UserSVG}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
