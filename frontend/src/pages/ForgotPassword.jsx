function ForgotPassword() {
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col hero-content ">
        <div className="mb-3 text-center">
          <h1 className="text-5xl font-bold">Forgot Password</h1>
        </div>
        <div className="w-full max-w-md shadow-xl card bg-base-100 shrink-0">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
                      </div>
                      <div>
                          <button className="w-full mt-3 btn-secondary btn">
                              Forgot Password
                          </button>
                      </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
