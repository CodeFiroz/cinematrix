

const ForgotPassword = () => {
  return (
    <>
    
    <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
  <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
    
    <h2 className="text-3xl font-bold text-center font-bebas uppercase tracking-wide">
    Forgot Your Password?
    </h2>
    <p className="text-sm text-gray-400 text-center mt-2">
    No big deal — happens to the best of us. Enter your email and we’ll send you a reset link faster than a Fast & Furious sequel.
    </p>

    <form className="mt-8 space-y-5">
      <div>
        <label className="block mb-1 text-sm text-gray-300">Username or Email</label>
        <input type="text" className="w-full px-4 py-2 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]" placeholder="movielover99" />
      </div>
     
    
      <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded font-bold cursor-pointer hover:bg-[#e0a800] transition-all">
      Send Reset Link
      </button>
    </form>


    <p className="text-xs text-gray-500 text-center mt-6">
    Rememberd password  <a href="/login" className="text-[#FFB900] underline">Login  here</a>.
    </p>
  </div>
</div>


    </>
  )
}

export default ForgotPassword