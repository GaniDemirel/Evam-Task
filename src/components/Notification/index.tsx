import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { hideNotification } from "../../redux/NotificationSlice";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { message, isVisible } = useSelector(
    (state: RootState) => state.notification
  );

  // Display notification for 3 sec.
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white py-3 px-5 rounded shadow-lg z-50 transition-opacity duration-300 flex items-center justify-between">
      <p>{message}</p>
      <button
        onClick={() => dispatch(hideNotification())}
        className="ml-4 text-white hover:text-gray-400"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
