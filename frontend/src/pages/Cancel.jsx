import { Link } from "react-router-dom";
import cancel from "../asset/cancel.gif";

const Cancel = () => {
  return (
    <div className="container max-w-md p-10 m-2 mx-auto rounded shadow bg-base-300">
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <div className="bg-white">
          <img
            src={cancel}
            alt="success"
            className="bg-white rounded w-44 h-44 mix-blend-multiply "
          />
        </div>
        <h1 className="success-text text-error">
          Your order has been canceled.
        </h1>
        <Link to="/cart" className="btn btn-outline btn-success">
          Go To Cart
        </Link>
        <div className="flex items-center w-full p-2 justify-evenly">
          <Link to="orders" className="btn btn-outline btn-success">
            Orders
          </Link>
          <Link to="/" className="btn btn-primary btn-outline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
