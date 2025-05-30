import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import { useState } from "react";
import { Link } from "react-router-dom"
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "../../store/authStore.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formerrors, setFormErrors] = useState({
    username: '',
    email: '',
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

  const clearErrors = () => setFormErrors({ username: '', email: '', password: '' });
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();


    clearErrors();

    let hasError = false;


    if (formdata.username == "") {
      setError("username", "Please create your username");
      hasError = true;
    }

    if (formdata.email == "") {
      setError("email", "Please enter a email address");
      hasError = true;
    }

    if (!isValidEmail(formdata.email)) {
      setError("email", "Please enter a valid email address");
      hasError = true;
    }


    if (formdata.password == "") {
      setError("password", "Please create your password");
      hasError = true;
    }
  
    
    if (!hasError) {
      setIsLoading(true)
     
      try {
        const registerRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, formdata, { withCredentials: true, });

        setAuth({ user: registerRes.data.user });


        toast.success("Successfully Registred");
        setFormdata({
          username: '',
          email: '',
          password: ''
        })
        setIsLoading(false);

        navigate("/")

      } catch (error) {

        setIsLoading(false);
        
        if (error.response) {
          setIsLoading(false);

          const { field, message } = error.response.data;

          if (field && message) {
            setError(field, message);
          } else if (error) {
            toast.error(error);
          } else {
            toast.error("Register failed. Try again.");
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
            Join <span className="text-[#FFB900]">Cinematrix</span>
          </h2>
          <p className="text-sm text-gray-400 text-center mt-2">
            Create your account and start building your cinematic universe.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>

            <InputField
              id="username"
              type="text"
              label="Username"
              placeholder="cinefile028"
              name="username"
              value={formdata.username}
              onChange={handleChange}
              error={formerrors.username}
            />

            <InputField
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              error={formerrors.email}
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
            Signing you up...
            </button>
              ) : (
                <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded cursor-pointer font-bold hover:bg-[#e0a800] transition-all">
                Register
              </button>
              )
            }


           
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Already have an account? <Link to="/login" className="text-[#FFB900] underline">Log in here</Link>.
          </p>
        </div>
      </div>


    </>
  )
}

export default Register