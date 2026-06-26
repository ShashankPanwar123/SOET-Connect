import {
  useEffect,
  useState
} from "react";

import userService from "../services/userService";
import UserTable from "../components/UserTable";

function UserManagement() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {

      const data =
        await userService
        .getUsers();

      setUsers(data);
    };

  return (
    <div className="container mt-4">

      <h2>
        User Management
      </h2>

      <UserTable users={users} />

    </div>
  );
}

export default UserManagement;