import { useState } from "react"
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Header = () => {

    const { isLoggedIn, user  } = useAuthStore();

    const [profileMenu, setProfileMenu] = useState(false);
    const [search, setSearch] = useState(false);

    return (
        <>

            <div className="flex justify-center">

                <header
                    className="flex items-center justify-between gap-3 w-full lg:max-w-8/10 p-2 border-b-1 border-stone-800"
                >

                    <Link
                        to="/"
                        className="text-3xl uppercase font-bebas text-white"
                    >
                        Cine<span className="text-amber-400">matrix.</span>
                    </Link>

                    <div className="flex items-center">

                        <div
                            className=" bg-stone-900 p-1 px-3 rounded hidden lg:flex  items-center gap-5 mr-5"
                        >
                            <i className="fi fi-rr-search mt-1"></i>
                            <input type="text" name="s" id="s" placeholder="Search..." className="w-120 outline-0 border-0" />
                        </div>


                        <div className={`${search ? 'w-auto' : 'w-10'} h-10 px-3 lg:hidden flex justify-center items-center rounded-full bg-stone-900 cursor-pointer mr-3`}>
                            <i className={`fi ${search ? 'fi-rr-x' : 'fi-rr-search'} text-sm mt-1`} onClick={() => setSearch(!search)}></i>
                            <input type="search" placeholder="Search..." className={`${search ? '' : 'hidden'} duration-150 ease-in-out ml-2 border-0 outline-0`} />
                        </div>


                        {
                            isLoggedIn ? (
                                <div className="p-1 px-2 rounded-full pr-4 flex items-center gap-2 bg-stone-900 relative cursor-pointer hover:bg-neutral-800" onClick={() => setProfileMenu(!profileMenu)}>

                                <img src="https://i.pinimg.com/564x/fa/d7/0a/fad70acf960a2068524cf0ee39da9dc2.jpg"
                                    className=" w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-semibold text-zinc-400">{user.username}</span>
                                <div className={`w-50 bg-stone-900 p-1 rounded absolute z-50 right-0 top-14 ${profileMenu ? 'block' : 'hidden'}`}>
                                    <a href="#"
                                        className="flex items-center gap-3 px-2 py-1 rounded hover:bg-stone-700 hover:text-white"
                                    >
                                        <i className="fi fi-rr-user mt-1"></i>
                                        <span className="font-bebas">My Profile</span>
                                    </a>
                                    <a href="#"
                                        className="flex items-center gap-3 px-2 py-1 rounded hover:bg-stone-700 hover:text-white"
                                    >
                                        <i className="fi fi-rr-film mt-1"></i>
                                        <span className="font-bebas">My List</span>
                                    </a>
                                    <a href="#"
                                        className="flex items-center gap-3 px-2 py-1 rounded hover:bg-stone-700 hover:text-white"
                                    >
                                        <i className="fi fi-rr-star mt-1"></i>
                                        <span className="font-bebas">My Review</span>
                                    </a>
                                    <a href="#"
                                        className="flex items-center gap-3 px-2 py-1 rounded hover:bg-stone-700 hover:text-white"
                                    >
                                        <i className="fi fi-rr-settings mt-1"></i>
                                        <span className="font-bebas">Edit Profile</span>
                                    </a>
                                    <a href="#"
                                        className="flex items-center gap-3 px-2 py-1 rounded hover:bg-red-900 hover:text-white"
                                    >
                                        <i className="fi fi-rr-sign-out-alt mt-1"></i>
                                        <span className="font-bebas">Logout</span>
                                    </a>
                                </div>
                            </div>
                            ) : (
                                <Link to="/login" className="p-1 px-2 rounded-full pr-4 flex items-center gap-2 bg-stone-900 relative cursor-pointer hover:bg-neutral-800">

                                <img src="https://i.pinimg.com/564x/fa/d7/0a/fad70acf960a2068524cf0ee39da9dc2.jpg"
                                    className=" w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-semibold text-zinc-400">Sign In</span>
                                </Link>
                            )
                        }

                       



                    </div>

                </header>

            </div>




        </>
    )
}

export default Header