import { IoIosSearch } from "react-icons/io";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Navbar() {
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
          <FaRegUser />
        </div>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FaCartShopping />
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <Link to="/login" className="btn btn-primary">
          login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
