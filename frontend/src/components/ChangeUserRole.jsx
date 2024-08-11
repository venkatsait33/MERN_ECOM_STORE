import { useState } from "react";
import Role from "../utils/Role";
import { IoClose } from "react-icons/io5";
import Api from "../api/Api";
import { toast } from "react-toastify";

const ChangeUserRole = ({
  username,
  email,
  role,
  onClose,
  userId,
  refreshFn,
}) => {
  const [userRole, setUserRole] = useState(role);
  console.log(userRole);
  const updateUserRole = async () => {
    const fetchData = await fetch(Api.update_users.url, {
      method: Api.update_users.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, role: userRole }),
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      onClose();
      refreshFn();
    }
    console.log(data);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-300">
      <div className="max-w-sm w-[35%] p-2 rounded shadow-md bg-primary-content ">
        <div className="flex justify-end">
          <button className="absolute btn btn-sm btn-circle" onClick={onClose}>
            <IoClose className="" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold text-center">Change User Role</h1>
          <p>Name:{username}</p>
          <p>email: {email}</p>
          <div className="flex items-center justify-between">
            <p>Role:</p>
            <select
              value={userRole}
              className="max-w-xs select select-sm select-bordered"
              onChange={(e) => setUserRole(e.target.value)}
            >
              {Object.values(Role).map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={updateUserRole}
            className="w-full btn btn-primary btn-sm"
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
