import { useEffect, useState } from "react";
import Api from "../../api/Api";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import ChangeUserRole from "../../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateData, setUpdateData] = useState({
    email: "",
    username: "",
    role: "",
    _id: "",
  });
  const fetchAllUsersData = async () => {
    const responseData = await fetch(Api.all_users.url, {
      method: Api.all_users.method,
      credentials: "include",
    });
    const data = await responseData.json();
    if (data.success) {
      console.log(data);
      setAllUsers(data.data);
    }
    if (data.error) {
      console.log(data.message);
      setAllUsers(data.data);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  return (
    <div className="">
      <div className="p-2 overflow-x-auto border rounded shadow scrollbar-hide">
        <table className="table table-lg user-table">
          <thead className="rounded bg-secondary">
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((user, index) => (
                <tr key={user._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>{moment(user?.createdAt).format("ll")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setUpdateData(user);
                        setOpenUpdate(true);
                      }}
                    >
                      Edit <FaRegEdit />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openUpdate && (
        <ChangeUserRole
          {...updateData}
          userId={updateData._id}
          onClose={() => setOpenUpdate(false)}
          refreshFn={fetchAllUsersData}
        />
      )}
    </div>
  );
};

export default AllUsers;
