import {
  useState
} from "react";

import {
  FaBars
} from "react-icons/fa";

function ResponsiveSidebar({
  children
}) {

  const [open,
    setOpen] =
    useState(false);

  return (

    <>

      <button
        className="
        btn btn-dark m-2"
        onClick={() =>
          setOpen(!open)
        }
      >

        <FaBars />

      </button>

      {
        open && (

          <div
            className="
            mobile-sidebar"
          >

            {children}

          </div>

        )
      }

    </>

  );
}

export default ResponsiveSidebar;