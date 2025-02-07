import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="max-w-[1440px] mx-auto bg-gray-100">
      <div className="container mx-auto py-12 px-4 lg:px-0">
        {/* Page Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#2A254B]">Contact Us</h1>
          <p className="mt-2 text-[#505977] text-sm">
            Feel free to reach out to us anytime. We&#39;d love to hear from you!
          </p>
        </header>

        {/* Contact Form Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#2A254B]"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#2A254B] focus:border-[#2A254B]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#2A254B]"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#2A254B] focus:border-[#2A254B]"
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#2A254B]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-[#2A254B] focus:border-[#2A254B]"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#36305c] text-white py-2 px-4 rounded-md font-medium shadow-md hover:bg-[#4a3e74]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-4">
              Contact Information
            </h2>
            <div className="flex items-center gap-4">
              <HiOutlineMail size={24} className="text-[#2A254B]" />
              <div>
                <p className="font-medium text-[#2A254B]">Email</p>
                <p className="text-sm text-[#505977]">kiranshoaib091@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiPhoneCall size={24} className="text-[#2A254B]" />
              <div>
                <p className="font-medium text-[#2A254B]">Phone</p>
                <p className="text-sm text-[#505977]">(1234) 567890</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#2A254B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13 12m0 0l-4.657 4.657m4.657-4.657V6.343m0 5.657L6.343 6.343m10.314 0L12 12m0 0V6.343"
                />
              </svg>
              <div>
                <p className="font-medium text-[#2A254B]">Address</p>
                <p className="text-sm text-[#505977]">
                  123 Main Street, Karachi
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="inline-block bg-[#36305c] text-white py-2 px-6 rounded-md font-medium shadow-md hover:bg-[#4a3e74] text-center"
            >
              Go Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}