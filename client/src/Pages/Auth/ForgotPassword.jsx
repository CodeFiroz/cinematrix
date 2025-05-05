import { Link } from "react-router-dom"
import { useState } from "react"
import InputField from "../../components/InputField/InputField";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"


const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();

    setUsernameError("");

    let hasError = false;

    
    if (username == "") {
      setUsernameError("Please enter your username or email");
      hasError = true;
    }

    if (!hasError) {
      setIsLoading(true)
      try{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, {username});
        setUsername("");
        toast.success("Password reset link send to your registered email.");
         setIsLoading(false)
      }catch(error){
         setIsLoading(false)
        if (error.response) {

          const { message } = error.response.data;

          if (message) {
            setUsernameError(message);
          } else if (error) {
            toast.error(error);
          } else {
            toast.error("failed. Try again.");
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
    Forgot Your Password?
    </h2>
    <p className="text-sm text-gray-400 text-center mt-2">
    No big deal — happens to the best of us. Enter your email and we’ll send you a reset link faster than a Fast & Furious sequel.
    </p>

    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

      <InputField 
        id="username"
        name="username"
        type="text"
        label="Username or Email"
        placeholder="movielover99"
        onChange={(e)=> setUsername(e.target.value)}
        value={username}
        error={usernameError}
      />

     
{
              isLoading  ? (
                <button type="button" disabled className="w-full bg-neutral-700 text-zinc-500 py-2 rounded cursor-none font-bold">
            Sending Link...
            </button>
              ) : (
                <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded font-bold cursor-pointer hover:bg-[#e0a800] transition-all">
                Send Reset Link
                </button>
              )
            }
    
    
    </form>


    <p className="text-xs text-gray-500 text-center mt-6">
    Rememberd password  <Link to="/login" className="text-[#FFB900] underline">Login  here</Link>.
    </p>
  </div>
</div>


    </>
  )
}

export default ForgotPassword