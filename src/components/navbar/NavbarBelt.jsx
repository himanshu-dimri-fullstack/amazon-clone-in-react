import logo from "../../assets/amazon_logo.png";
import india from "../../assets/india.svg";
import { MapPin, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Button from "../Button";
import Searchbar from "../Searchbar";

const NavbarBelt = () => {
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = () => setShowDropdown(false);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        setShowDropdown(false);
    }, [location]);

    return (
        <>
            <div className='flex items-center justify-between px-5 lg:px-1 bg-[#131921] h-15 p-1'>

                <Link to={'/'} className='flex px-1 pt-3 border border-transparent hover:border-white focus:outline-none focus:ring-0'>
                    <img src={logo} className='h-8 w-20 sm:h-10 sm:w-25' />
                    <span className='text-white text-sm sm:pt-1'>.in</span>
                </Link>

                <div className="hidden lg:block">
                    <div className='px-1 py-2 border border-transparent hover:border-white cursor-pointer'>
                        <p className='text-[12px] text-white pl-5'>Delivering to New Delhi 110020</p>
                        <div className='flex'>
                            <MapPin className="w-4.5 h-4.5 text-white" />
                            <p className='text-sm font-bold text-white'>Update Location</p>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block flex-1 mx-2">
                    <Searchbar />
                </div>

                <div className="flex items-center ml-auto gap-2 sm:gap-3">

                    <div className='hidden lg:flex items-center gap-1 px-1 pt-4 border border-transparent hover:border-white'>
                        <img src={india} className='h-5 w-5' />
                        <span className='text-sm font-bold text-white'>En</span>
                        <div className="w-0 h-0 mt-1
                            border-l-4 border-l-transparent
                            border-r-4 border-r-transparent
                            border-t-[5px] border-t-[#e6e6e6]">
                        </div>
                    </div>

                    {
                        user ? (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDropdown(prev => !prev);
                                }}
                                className="relative group px-1 pt-2 lg:pt-4.5 border border-transparent
                                group-hover:border-white group-hover:border-t-[#131921] cursor-pointer">

                                <div className='flex items-center gap-1'>
                                    <span className='text-[#f08804] text-sm font-bold leading-none'>
                                        Hi, {user?.name?.split(" ")[0]}
                                    </span>

                                    <div className="w-0 h-0
                                        border-l-4 border-l-transparent
                                        border-r-4 border-r-transparent
                                        border-t-[5px] border-t-[#e6e6e6]">
                                    </div>
                                </div>

                                <div className={`absolute right-0 mt-3 bg-white text-black rounded shadow-lg z-50
                                    ${showDropdown ? "block" : "hidden"} lg:hidden group-hover:block`}>

                                    <div className="absolute right-3 -top-2 w-0 h-0
                                        border-l-8 border-l-transparent
                                        border-r-8 border-r-transparent
                                        border-b-8 border-b-white">
                                    </div>

                                    <div className="flex justify-center items-center w-40 h-15 sm:h-20">
                                        <Button onClick={logout} text={"Logout"} className="w-20! bg-red-500 hover:bg-red-600" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDropdown(prev => !prev);
                                }}
                                className='relative group px-1 sm:pt-1 border border-transparent cursor-pointer
                                group-hover:border-white group-hover:border-t-[#131921]'>

                                <span className='text-white text-[12px] block max-sm:hidden'>
                                    Hello, sign in
                                </span>

                                <div className='flex items-center gap-1'>
                                    <span className='text-white text-sm font-bold leading-none hidden sm:block'>
                                        Account & Lists
                                    </span>

                                    <User className="block sm:hidden text-white" size={20} />

                                    <div className="hidden sm:block w-0 h-0
                                        border-l-4 border-l-transparent
                                        border-r-4 border-r-transparent
                                        border-t-[5px] border-t-[#e6e6e6]">
                                    </div>
                                </div>

                                <div className={`absolute right-0 top-full pt-3 z-50
                                    ${showDropdown ? "block" : "hidden"} lg:hidden group-hover:block`}>

                                    <div className="bg-white w-56 rounded shadow-xl p-4">
                                        <div className="flex flex-col gap-3">
                                            <Link to="/login">
                                                <Button text={"Login"} className="bg-yellow-400 hover:bg-yellow-500 text-black!" />
                                            </Link>
                                            <Link to="/signup">
                                                <Button text={"Signup"} className="bg-white text-black! border border-gray-300 hover:bg-gray-100" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="hidden lg:block">
                        <div className='px-1 pt-1 pb-2 border border-transparent hover:border-white cursor-pointer'>
                            <span className='text-white text-[12px]'>Return</span>
                            <p className='text-white text-sm font-bold leading-none'>& Orders</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1 px-1 sm:pt-2 border border-transparent hover:border-white focus:outline-none focus:ring-0'>
                        <Link to={"/cart"} className="flex items-center">
                            <span className='text-[#f08804] text-sm font-bold'>
                                {cart.length}
                            </span>
                            <ShoppingCart className='text-white ml-1' size={22} />
                        </Link>

                        <Link to={"/cart"} className="hidden lg:block">
                            <span className='text-white font-bold text-md'>Cart</span>
                        </Link>
                    </div>

                </div>
            </div>

            <div className="sm:hidden px-5 pb-1 bg-[#131921]">
                <Searchbar />
            </div>
        </>
    )
}

export default NavbarBelt;