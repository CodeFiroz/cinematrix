import { useEffect, useRef } from "react"
import { useAuthStore } from "../../store/authStore";

const ReplyModel = ({ isOpen, onClose, replyData, onChange, onSubmit }) => {

    const modalRef = useRef();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
  
      if (isOpen) document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center h-full justify-center bg-[rgba(0,0,0,0.86)] backdrop-blur-md">
      <div ref={modalRef} className="p-6 rounded-lg shadow-xl w-full max-w-3xl">
        <section className="bg-zinc-800 p-6 rounded-xl border border-zinc-600 shadow-md w-full mx-auto space-y-4 transition-all">

      {
        !isLoggedIn ? (
          <h3 className="text-2xl text-zinc-200 text-center">Sign in for replying</h3>
        ) : (
         <>
          <h3 className="text-md font-semibold text-white">
            Reply to <span className="text-zinc-400">@{replyData.username}</span>
          </h3>
          <textarea
            className="w-full bg-zinc-700 text-white p-4 rounded-lg resize-none min-h-[120px]"
            value={replyData.content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex justify-end">
            <button
              onClick={onSubmit}
              className="rounded-full bg-amber-500 hover:bg-amber-600 px-8 py-2 text-white font-medium border-2 border-amber-400"
            >
              Reply
            </button>
          </div>
          </>
        )
      }

        </section>
       
      </div>
    </div>
    </>
  )
}

export default ReplyModel