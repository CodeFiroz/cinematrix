

const Login = () => {
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

    <form className="mt-8 space-y-5">
      <div>
        <label className="block mb-1 text-sm text-gray-300">Username or Email</label>
        <input type="text" className="w-full px-4 py-2 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]" placeholder="movielover99" />
      </div>
     
      <div>
        <label className="block mb-1 text-sm text-gray-300">Password</label>
        <input type="password" className="w-full px-4 py-2 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]" placeholder="••••••••" />
      </div>
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