import { Link } from "react-router-dom";
import loginGif from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData("");
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content ">
        <div className="mb-3 text-center">
          <h1 className="text-5xl font-bold">SingIn now!</h1>
        </div>
        <div className="w-full max-w-md shadow-xl card bg-base-100 shrink-0">
          <div className="items-center p-4 card-body">
            <img
              src={loginGif}
              alt="UserProfile"
              className="w-20 h-30 rounded-xl"
            />
          
          </div>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex items-center justify-between input input-bordered">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <label className="label">
                <Link
                  to="/forgotpassword"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary">Sign-In</button>
            </div>
            <div className="mt-3">
              <h2 className="text-base text-center">
                Create your account!{" "}
                <Link to="/signup" className="link link-secondary">
                  SignUp
                </Link>{" "}
                &nbsp;
                <span>Click here</span>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
