import { IoIosSearch } from "react-icons/io";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { setUserDetails } from "../redux/slice/userSlice";
function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

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
    <nav className="shadow-lg navbar bg-base-100">
      <div className="navbar-start">
        <h1>ECOM-Store</h1>
      </div>
      <div className=" navbar-center input input-bordered">
        <input type="text" className="" placeholder="Search" />
        <span>
          <IoIosSearch />
        </span>
      </div>
      <div className="gap-2 p-2 navbar-end md:text-xl">
        <div>
          {user?.data.profilePicture ? (
            <img
              src={user?.data.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <FaRegUser />
          )}
        </div>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FaCartShopping />
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div>
          {user?.data?._id ? (
            <div>
              <button className="btn btn-error" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
