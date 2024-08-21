import { Link } from "react-router-dom";
import success from "../asset/success.gif";
const Success = () => {
  return (
    <div className="container max-w-md p-10 m-2 mx-auto rounded shadow bg-base-300">
      <div className="flex flex-col items-center justify-center h-full ">
        <img src={success} alt="success" className=" w-44 h-44 success" />
        <h1 className="success-text">
          Your order has been placed successfully
        </h1>
        <div className="flex items-center w-full p-2 justify-evenly">
          <Link to='orders' className="btn btn-outline btn-success">Orders</Link>
          <Link to='/' className="btn btn-primary btn-outline">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
