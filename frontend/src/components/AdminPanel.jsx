import { useEffect } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Role from "../utils/Role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.data?.role !== Role.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="md:flex sm:flex min-h-[calc(100vh-100px)] gap-2">
      <aside className="w-full  max-[520px]:hidden min-h-full text-center shadow shadow-blue-100 max-w-60">
        <div className="flex items-center justify-center h-32 ">
          <div className="relative flex items-center justify-center rounded-full">
            {user?.data?.profilePicture ? (
              <img
                src={user?.data?.profilePicture}
                alt=""
                className="rounded-full w-[100px] h-[100px]"
              />
            ) : (
              <FaRegUser className="w-10 h-10 " />
            )}
          </div>
        </div>
        <div>
          {user?.data?.username && (
            <h1 className="text-xl font-bold capitalize md:text-2xl">
              {user?.data?.username}
            </h1>
          )}
        </div>
        <div>
          {user?.data?.role && (
            <h1 className="text-xl font-bold capitalize md:text-2xl">
              {user?.data?.role}
            </h1>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <nav>
            <Link to={"all-users"} className="link">
              All Users
            </Link>
          </nav>
          <nav>
            <Link to={"all-products"} className="link">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <aside className="w-full shadow sm:hidden md:hidden ">
        <div className="flex items-center justify-between w-full p-4">
          <div className="rounded-full ">
            {user?.data?.profilePicture ? (
              <img
                src={user?.data?.profilePicture}
                alt=""
                className="rounded-full w-[35px] h-[35px]"
              />
            ) : (
              <FaRegUser className="w-10 h-10 " />
            )}
          </div>
          <div className="flex items-center justify-between gap-5">
            <div>
              {user?.data?.username && (
                <h1 className="text-xl font-bold capitalize ">
                  {user?.data?.username}
                </h1>
              )}
            </div>
            <div>
              {user?.data?.role && (
                <h1 className="text-xl font-bold capitalize md:text-2xl">
                  {user?.data?.role}
                </h1>
              )}
            </div>
            <div className="flex justify-center gap-2 ">
              <nav>
                <Link to={"all-users"} className="link">
                  All Users
                </Link>
              </nav>
              <nav>
                <Link to={"all-products"} className="link">
                  All Products
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </aside>
      <main className="w-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
