import Signup from "./Signup";
import Login from "./Login";

const AuthPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-48  rounded-xl ">
        {/* Login Form */}
        <Login />
        {/* Signup Form */}
        <Signup />
      </div>
    </div>
  );
};

export default AuthPage;
