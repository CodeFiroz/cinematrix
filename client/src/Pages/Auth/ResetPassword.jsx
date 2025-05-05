import PasswordField from "../../components/InputField/PasswordField"
import { useState } from "react"
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { token }  = useParams();

  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const [passerror, setPassError] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setPassError("");
    let hasError = false;

    if (password == "") {
      setPassError("Please create a password");
      hasError = true;
    }

    if (!hasError) {
      setIsLoading(true);
      try{
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password/${token}`, {password});
        toast.success("Password Reset");
        setPassword("");
        setIsLoading(false);
      }catch(error){
        
        setIsLoading(false);
        if (error.response) {

          const { field, message } = error.response.data;

          if (field && message) {
            setPassError(message);
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
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-400 text-center mt-2">
            Enter your new password below. Let’s get you back to binge-watching.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                      
           <PasswordField
              id="password"
              label="New Password"
              placeholder="••••••••"
              name="password"
              value={password}
              onChange={handleChange}
              error={passerror}
            />


{
              isLoading  ? (
                <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded font-bold cursor-pointer hover:bg-[#e0a800] transition-all">
              Reseting Password...
            </button>
              ) : (
                <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded font-bold cursor-pointer hover:bg-[#e0a800] transition-all">
              Update Password
            </button>
              )
            }
           
          </form>

        </div>
      </div>


    </>
  )
}

export default ResetPassword