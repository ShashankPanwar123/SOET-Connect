import { useContext } from "react";

import {
  AuthContext
} from "../context/AuthContext";

function Profile() {

  const { user } =
    useContext(AuthContext);

  return (
    <div className="container mt-5">

      <h2>
        Profile
      </h2>

      <div className="dashboard-card">

        <h4>
          {user?.name}
        </h4>

        <p>
          {user?.email}
        </p>

        <p>
          Role: {user?.role}
        </p>

      </div>

    </div>
  );
}

export default Profile;