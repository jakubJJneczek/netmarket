const Signup = () => {
  return (
    <div className="login_Form bg-gray-50 px-1 lg:px-8 py-6 border border-gray-100 rounded-xl shadow-md w-96">
      {/* Top Heading */}
      <div className="mb-5">
        <h2 className="text-left text-2xl font-bold text-gray-500">
          I do not have a account
        </h2>
        <h4 className="text-left text-1xl  text-gray-400">
          Sign up with email and password
        </h4>
      </div>

      {/* Input One */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Full Name"
          className="bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
        />
      </div>

      {/* Input Two */}
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email Address"
          className="bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
        />
      </div>

      {/* Input Three */}
      <div className="mb-5">
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-50 border border-gray-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-500"
        />
      </div>

      {/* Signup Button */}
      <div className="mb-5">
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
