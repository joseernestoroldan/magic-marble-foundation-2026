"use client";

import Paypal from "@/components/payments/paypal";
import Venmo from "@/components/payments/venmo";
import VideoFrame from "@/components/VideoFrame/VideoFrame";
import SmokeText from "@/components/SmokeText/SmokeText";

const DonationsPage = () => {
  return (
    <section className="w-full py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center">
          <SmokeText 
            text="Help Us Help Them" 
            className="text-4xl md:text-6xl font-extrabold text-cyan-600 dark:text-white tracking-tight mb-4"
            staggerMs={80}
          />
        </div>

        {/* Main Content Card */}
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl p-6 md:p-12 border border-gray-100 dark:border-gray-700">
          
          {/* Video Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center rounded-2xl overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-900">
            <VideoFrame
              src="https://www.youtube.com/embed/y2xP3mCkCSU?autoplay=1&mute=1"
            />
          </div>

          {/* Content & Donation Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Every Penny Counts
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 text-justify mb-8">
              Your donation is 100% dedicated to those we serve, whether they are
              humans in need of food, medical care, or education, or non-human
              animals in need of rescue, sterilization, and advocacy. With our
              commitment to zero administrative salaries and minimal overhead costs,
              we guarantee that your contribution will make a tangible difference.
              Join us in making a real impact in the lives of those who need it
              most.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="w-full sm:w-auto transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl">
                <Paypal />
              </div>
              <div className="w-full sm:w-auto transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl">
                <Venmo />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DonationsPage;
