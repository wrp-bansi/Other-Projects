const Hero = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-cyan-900 to-blue-900 flex flex-col items-center justify-center tracking-widest ">
                <div className="w-[100%]  xl:p-0 dark:bg-gray-800 dark:border-gray-700  sm:max-w-xl md:max-w-3xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center mt-2 text-white">
                        <h1 className="md:text-5xl font-extrabold  dark:text-white text-3xl ">
                            Welcome to Microsoft Support
                        </h1>
                        <div className="lg:flex md:flex items-center justify-center">
                            <p className=" mt-5 lg:flex-initial md:flex-initial text-xs md:text-lg md:font-bold">Please sign in so we may servr you better</p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className=" border-gray-300 lg:flex-initial md:flex-initial  focus:ring-primary-600 focus:border-primary-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  rounded-sm border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-white placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 bg-blue-900 text-center mt-5 lg:max-w-24 md:max-w-24 lg:mx-2 md:mx-2"
                                placeholder="Sign in"
                            />
                        </div>
                        <div>
                            <span className="flex mb-5 text-xs ">
                                <input
                                    type="text"

                                    placeholder="How we can Help you?"
                                    className="bg-gray-50 text-gray-900 sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <span className=" font-bold text-center py-4  bg-white border-0">
                                    <i class="fa-solid fa-arrow-right text-blue-700 text-lg rounded-lg pr-3"></i> </span>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Hero