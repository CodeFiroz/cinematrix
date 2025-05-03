

const ResetPassword = () => {
  return (
    <>
    
    <div className="min-h-screen bg-[#0C0A09] flex items-center justify-center px-4">
  <div className="bg-[#1A1A1A] text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
    
    <h2 className="text-3xl font-bold text-center font-bebas uppercase tracking-wide">
    Reset Your Password
    </h2>
    <p className="text-sm text-gray-400 text-center mt-2">
    Enter your new password below. Let’s get you back to binge-watching.
    </p>

    <form className="mt-8 space-y-5">
    <div>
        <label className="block mb-1 text-sm text-gray-300">New Password</label>
        <input type="password" className="w-full px-4 py-2 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]" placeholder="••••••••" />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-300">Confirm Password</label>
        <input type="password" className="w-full px-4 py-2 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]" placeholder="••••••••" />
      </div>
    
      <button type="submit" className="w-full bg-[#FFB900] text-[#0C0A09] py-2 rounded font-bold cursor-pointer hover:bg-[#e0a800] transition-all">
      Update Password
      </button>
    </form>

  </div>
</div>


    </>
  )
}

export default ResetPassword