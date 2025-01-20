
function HeaderTop() {
    return (
        <div className= "mx-auto max-w-[1440px] bg-[#2A254B]  text-white flex justify-between items-center px-1 py-1 text-xl lg:text-xs">
            <div className=" flex-1 flex justify-center text-center gap-1 sm:text-left lg:text-center md:text-center text-xs">
                <p>Free delivery on all orders over £50 with code easter checkout</p>

            </div>
            <div className="flex items-center gap-5 ">
                <select
                    className="bg-[#2A254B] text-white border border-gray-500  rounded text-xs mr-2"
                    aria-label="Language Select"
                >
                    <option>English</option>
                    <option>Urdu</option>
                    <option>French</option>
                </select>
            </div>
        </div>
    );
};

export default HeaderTop;