import { FaBell } from "react-icons/fa";

function NotificationBell({
  count
}) {

  return (

    <div
      className="
      notification-wrapper"
    >

      <FaBell size={24} />

      {
        count > 0 && (

          <span
            className="
            notification-badge"
          >

            {count}

          </span>

        )
      }

    </div>

  );
}

export default NotificationBell;