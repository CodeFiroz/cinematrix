
const Footer = () => {
  return (
    <>
    
    <div className="flex justify-center items-center py-4 bg-zinc-800">
    <div className="w-full lg:max-w-8/10 p-2 flex justify-between items-center">
    
    <div>
        <nav className="flex gap-3 font-bold uppercase ">
            <a href="#" className="hover:text-amber-600">About</a>
            <a href="#" className="hover:text-amber-600">Contact</a>
            <a href="#" className="hover:text-amber-600">Github Repo</a>
        </nav>
        <p className="text-sm text-zinc-500">
        © Cinematrix. Made by cinema fan in Delhi India. 
        </p>
    </div>

    <div className="flex items-center gap-3 text-2xl">
        <a href="#" className="hover:text-zinc-200"><i className="fi fi-brands-instagram"></i></a>
        <a href="#" className="hover:text-zinc-200"><i className="fi fi-brands-linkedin"></i></a>
        <a href="#" className="hover:text-zinc-200"><i className="fi fi-brands-github"></i></a>
        <a href="#" className="hover:text-zinc-200"><i className="fi fi-rr-envelope"></i></a>
    </div>

    </div>
    </div>

    </>
  )
}

export default Footer