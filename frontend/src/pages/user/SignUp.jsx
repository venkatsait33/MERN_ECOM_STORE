import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import loginGif from "../../asset/signin.gif";
import ImageToBase64 from "../../helpers/ImageToBase64";
import Api from "../../api/Api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    conformPassword: "",
    profilePicture: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.conformPassword) {
      const responseData = await fetch(Api.signUp.url, {
        method: Api.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const apiData = await responseData.json();
      if (apiData.success) {
        toast.success(apiData.message);
        navigate("/login");
      }
      if (apiData.error) {
        toast.error(apiData.message);
      }

      console.log(apiData);
    } else {
      toast.error("check password and conform password");
    }
  };

  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);
    setData({ ...data, profilePicture: imagePic });
  };

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content">
        <div className="mb-3 text-center">
          <h1 className="text-5xl font-bold">SingUp now!</h1>
        </div>
        <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
          <div className="items-center p-4 rounded card-body">
            <img
              src={data?.profilePicture || loginGif}
              alt="UserProfile"
              className="w-25 h-22 rounded-xl"
            />
            <form>
              <label>
                <div className=" btn btn-outline">upload Photo</div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPicture}
                />
              </label>
            </form>
          </div>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">UserName</span>
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                value={data.username}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Conform Password</span>
              </label>
              <div className="flex items-center justify-between input input-bordered">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Conform Password"
                  name="conformPassword"
                  value={data.conformPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary">Sing-Up</button>
            </div>
            <div className="mt-3">
              <h2 className="text-base text-center">
                Already have an account! &nbsp;{" "}
                <Link to="/login" className="link link-accent">
                  Sign-In
                </Link>{" "}
                &nbsp;
                <span>Click here</span>
              </h2>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
