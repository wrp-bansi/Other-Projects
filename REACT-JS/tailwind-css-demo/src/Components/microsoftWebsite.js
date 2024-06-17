const Microsoft = () => {
    return (
        <>
            <nav className="flex justify-between  items-center p-4 ">
                <div className="flex  justify-center items-center md:order-2">
                <div className="inline-block p-4 cursor-pointer md:hidden">
                    <div className="bg-black h-0.5 w-6 my-1"></div>
                    <div className="bg-black h-0.5 w-6 my-1"></div>
                    <div className="bg-black h-0.5 w-6 my-1"></div>
                </div>
                <div className="md:hidden">Search</div>
                </div>
                 <div>
                <div className="md:order-1 inline-block">Microsoft</div>
                <div className="inline-block ">
                <ul className="hidden md:flex mx-4 space-x-2">
                    <li className="">Support</li>
                    <li className="">Support</li>
                    <li className="">Support</li>
                    <li className="">Support</li>
                </ul>
                </div>

                </div>
                <div className="md:order-3 ">
                <div className="hidden md:inline-block"> all microsoft Search</div>
                <div className="inline-block">
                <div >card action</div>
                </div>

                    </div>



            </nav>
        </>
    )
}
export default Microsoft