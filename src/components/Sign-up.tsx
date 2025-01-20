function SignUp() {
    return (
      <div className="max-w-[1440px] mx-auto bg-[#F9F9F9] flex justify-center items-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-4xl bg-[#fff] rounded-md shadow-md px-4 sm:px-8 py-8">
          {/* Heading Section */}
          <div className="w-full text-center text-[#2A254B]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Join the club and get the benefits
            </h1>
            <p className="text-sm sm:text-base mt-4 leading-[24px]">
              Sign up for our newsletter and receive exclusive offers on new <br className="hidden sm:block"/> 
              ranges, sales, pop up stores, and more.
            </p>
          </div>
  
          {/* Input & Button Section */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="bg-[#F9F9F9] w-full sm:w-[70%] h-[48px] px-4 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A254B]"
            />
            <button className="w-full sm:w-[30%] h-[48px] bg-[#2A254B] text-[#fff] rounded-md hover:bg-[#1e1a3a] transition">
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default SignUp;
  