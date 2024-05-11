import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center p-10 h-screen bg-gradient-to-r from-red-400 to-orange-500">
        <section className="bg-white rounded-3xl w-[70%] shadow-lg ">
          <div className=" px-6 py-24 mx-auto lg:py-32">
            <div className="lg:flex px-12">
              <div className="lg:w-1/2">
                {/* <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" /> */}

                <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>

                <h1 className="mt-4 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
                  login to your account
                </h1>
                <h1 className="lg:mt-14 text-gray-600 md:text-lg">Don't have an account?  &nbsp;
                  <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </h1>
              </div>

              <div className="mt-8 lg:w-1/2 lg:mt-0">
                <form className="w-full lg:max-w-xl">
                  <div className="relative flex items-center">
                    <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>

                    <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:text-gray-300  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
                  </div>

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>

                    <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                  </div>



                  <div className="mt-8 md:flex md:items-center">
                    <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-all duration-300 transform bg-purple-600 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>

                    <a href="#" className=" mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline ">
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Login