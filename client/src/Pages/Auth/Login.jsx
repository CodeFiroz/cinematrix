import { useState } from "react"
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import { Link } from "react-router-dom"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

import { useAuthStore } from "../../store/authStore.js";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    username: 'khanfiroz4045@gmail.com',
    password: '12345678'
  });

  const [formerrors, setFormErrors] = useState({
    username: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    })
  }
  const setError = (field, error) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: error,
    }));

  }

  const clearErrors = () => setFormErrors({ username: '', password: '' });


  const handleLogin = async (e) => {
    e.preventDefault();

    clearErrors();

    let hasError = false;


    if (formdata.username == "") {
      setError("username", "Please enter your username or email");
      hasError = true;
    }

    if (formdata.password == "") {
      setError("password", "Please enter your password");
      hasError = true;
    }
    
    if (!hasError) {
      setIsLoading(true)

      try {
        const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formdata, { withCredentials: true, });
        setAuth({ user: loginResponse.data.user });
        
        toast.success("Successfully login");
        setFormdata({
          username: '',
          password: ''
        })
        setIsLoading(false);

        navigate("/")

      } catch (error) {
        setIsLoading(false);

        if (error.response) {

          const { field, message } = error.response.data;

          if (field && message) {
            setError(field, message);
          } else if (error) {
            toast.error(error);
          } else {
            toast.error("Login failed. Try again.");
          }

        } else {
          toast.error("Server unreachable. Internet okay?");
        }

      }

    }

  }

  return (
    <>

      <Toaster />
      <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
        <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-lg max-w-md w-full">

          <h2 className="text-3xl font-bold text-center font-bebas uppercase tracking-wide">
            Welcome Back to <span className="text-[#FFB900]">Cinematrix</span>
          </h2>
          <p className="text-sm text-gray-400 text-center mt-2">
            Your watchlist awaits. Log in to share reviews, discover gems, and vibe with fellow film nerds.

          </p>

          <form className="mt-8 space-y-2" onSubmit={handleLogin}>

            <InputField
              id="username"
              type="text"
              label="Username or Email"
              placeholder="cinefile028"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              error={formerrors.username}
            />

            <PasswordField
              id="password"
              label="Password"
              placeholder="••••••••"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              error={formerrors.password}
            />


            {
              isLoading  ? (
                <button type="button" disabled className="w-full bg-neutral-700 text-zinc-500 py-2 rounded cursor-none font-bold">
            Logging in...
            </button>
              ) : (
                <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded cursor-pointer font-bold hover:bg-[#e0a800] transition-all">
                Login
              </button>
              )
            }
          

            
          </form>

          <div className="text-right">

            <Link to="/forgot-password" className="text-[#FFB900] underline text-xs">Forgot Password ?</Link>

          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Don't have an account?  <Link to="/register" className="text-[#FFB900] underline">Sign up here</Link>.
          </p>
        </div>
      </div>


    </>
  )
}

export default Login