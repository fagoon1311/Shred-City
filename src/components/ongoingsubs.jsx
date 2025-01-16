import React from "react";

const OnGoingSubs = ({ data }) => {
  console.log(data);
  let dateStr = data[0]?.created_at;
  let expiry = new Date(dateStr);
  expiry.setMonth(expiry.getMonth() + 6);
  let year = expiry.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  let month = (expiry.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so add 1
  let day = expiry.getDate().toString().padStart(2, "0"); // Pad single digits with leading 0 if needed

  return (
    <div className="flex flex-col bg-[#f7f6f2] rounded-2xl items-center justify-center mt-8 py-10 shadow-xl w-[80%] mx-auto max-w-[600px]">
      <h1 className="text-[#2D2D2D] font-Poppins text-5xl font-extrabold py-6 text-center">
        Ongoing Membership
      </h1>
      <p className="text-[#3a6f5e] font-Poppins text-3xl font-semibold text-center">
        {data[0]?.type}
      </p>
      <p className="text-[#6e7a5e] mt-4 text-xl text-center font-medium">
        {`Expires on ${year}-${month}-${day}`}
      </p>
      <div className="mt-6 bg-gradient-to-r from-[#65a30d] to-[#3b4e22] text-white rounded-lg px-6 py-3 shadow-md hover:scale-105 transition-all duration-300">
        <button className="text-lg font-medium">Renew Now</button>
      </div>
    </div>
  );
};

export default OnGoingSubs;
