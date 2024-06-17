function Facebook(){
    return(
        <>
        <div className="flex mx-auto items-center justify-center bg-gray-100 h-[100vh] w-[100%]">
            <div className="left w-1/3 mx-10">
                <div>
                <img className="w-64" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="facebook"></img>
                </div>
                <h2 className="text-xl mx-5 text-black font-medium">Facebook helps you connect and share with the people in your life.</h2>
            </div>
            <div className="right flex flex-col bg-white py-5 px-5 rounded-xl w-1/3 shadow-lg shadow-white-500">
                <input  className="px-4 h-12 my-2 border border-gray-200 rounded-lg focus:outline outline-blue-500 " type="email" placeholder="Email address or phone number"></input>
                <input className="px-4 h-12 my-2 border border-gray-200 rounded-lg focus:outline outline-blue-500"  type="password" placeholder="password"></input>
                <button className="bg-blue-500 py-3 px-4 rounded-md my-2 text-white font-bold text-xl">Log in</button>
                <span className="text-center text-blue-600 text-sm my-2 cursor-pointer hover:underline">Forgotten password?</span>
                <hr className="my-2"></hr>
                <button className="bg-green-600 py-3 my-2 px-4 mx-auto w-fit rounded-lg text-white font-bold text-lg">Create new account</button>
            </div>

        </div>

        </>
    )
}
export default Facebook