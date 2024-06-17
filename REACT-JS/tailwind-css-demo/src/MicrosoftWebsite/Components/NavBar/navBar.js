const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between  items-center p-4 mx-auto container">
                <div className="flex  justify-center items-center md:order-2">
                    <div className="inline-block p-4 cursor-pointer md:hidden">
                        <div className="bg-black h-0.5 w-6 my-1"></div>
                        <div className="bg-black h-0.5 w-6 my-1"></div>
                        <div className="bg-black h-0.5 w-6 my-1"></div>
                    </div>
                    <div className="md:hidden"><i class="fa-solid fa-magnifying-glass text-lg"></i></div>
                </div>
                <div>
                    <img src="https://logowik.com/content/uploads/images/microsoft44289.logowik.com.webp" className="w-16 h-10 md:order-1 inline-block" alt="Microsoft"></img>
                    <div className="inline-block ">
                        <ul className="hidden md:flex mx-4 text-sm cursor-pointer">
                            <div className="md:flex  space-x-4  items-center justify-center font-black ">
                                <li className="text-xl font-bold"> |  &nbsp;Support</li>
                                <li className="">Microsoft 365</li>
                                <li className="">Office</li>
                                <li className="lg:hidden">More</li>
                                <li className="lg:hidden"><button className="border bottom-2 border-black px-2 rounded-sm py-1 font-bold">Buy Microsoft 365</button></li>
                            </div>
                            <div className="md:hidden lg:flex space-x-4  items-center justify-center font-black">
                                <li></li>
                                <li className="">Product</li>
                                <li className="">Devices</li>
                                <li className="">Account&biiling</li>
                                <li className="">Recouces</li>
                                <li className="" ><button className="border bottom-2 border-black px-2 rounded-sm py-1 font-bold">Buy Microsoft 365</button></li>
                            </div>
                        </ul>
                    </div>
                </div>
                <ul className="md:order-3 md:flex ">
                    <div className="hidden md:inline-block text-sm items-center justify-center  font-black" >
                        <li className=" mx-3">  All Microsoft &nbsp; &nbsp;<i class="fa-solid fa-magnifying-glass text-lg"></i></li>
                    </div>
                    <div className="md:inline-block  items-center justify-center text-sm">
                        <li className="mx-3"><i class="fa-regular fa-circle-user text-lg"></i></li>
                    </div>
                </ul>
            </nav>
        </>
    )
}
export default Navbar