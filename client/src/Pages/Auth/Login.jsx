import { useState } from "react"
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/InputField/PasswordField";

const Login = () => {

  const [formdata, setFormdata] = useState({
    username: '',
    password: ''
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

  const handleLogin = (e) => {
    e.preventDefault();

    setFormErrors({
      username: '',
      password: ''
    });

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
      alert("Submit")
    }

  }

  return (
    <>

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
              placeholder="******"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              error={formerrors.password}
            />


            <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded cursor-pointer font-bold hover:bg-[#e0a800] transition-all">
              Login
            </button>
          </form>

          <div className="text-right">

            <a href="/login" className="text-[#FFB900] underline text-xs">Forgot Password ?</a>

          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Don't have an account?  <a href="/login" className="text-[#FFB900] underline">Sign up here</a>.
          </p>
        </div>
      </div>


    </>
  )
}

export default Login