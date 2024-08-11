import { IoIosSearch } from "react-icons/io";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { setUserDetails } from "../redux/slice/userSlice";
import Role from "../utils/Role";
function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const handleLogout = async () => {
    const logoutData = await fetch(Api.logout.url, {
      method: Api.logout.method,
      credentials: "include",
    });
    const data = await logoutData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <nav className="shadow-lg max-[520px]:navbar max-[620px]:navbar flex lg:navbar bg-base-100">
      <div className="navbar navbar-start">
        <h1>ECOM-Store</h1>
      </div>
      <div className="flex  max-[769px]:hidden  max-[620px]:hidden  max-[520px]:hidden navbar-center input input-bordered">
        <input type="text" className="" placeholder="Search" />
        <span>
          <IoIosSearch />
        </span>
      </div>
      <div className="flex gap-2 p-2 md:navbar-end md:text-xl">
        {user && (
          <div>
            <div className=" dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="">
                  {user?.data?.profilePicture ? (
                    <img
                      src={user?.data?.profilePicture}
                      alt=""
                      className="w-10 h-10 rounded-full Tailwind CSS Navbar component"
                    />
                  ) : (
                    <FaRegUser />
                  )}
                </div>
              </div>
              {user?.data?.role === Role.ADMIN && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      <Link to="/admin">Admin Panel</Link>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}

        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FaCartShopping />
            <span className="badge badge-sm indicator-item">0</span>
          </div>
        </div>
        <div>
          {user?.data?._id ? (
            <div>
              <button
                className="btn btn-error  max-[520px]:btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn max-[520px]:btn-sm btn-primary">
              login
            </Link>
          )}
        </div>
        <div>
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="winter"
            />

            {/* sun icon */}
            <svg
              className="w-8 h-8 fill-current swap-off"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="w-8 h-8 fill-current swap-on"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
