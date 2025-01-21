import React from 'react'

const TrialsData = ({data}) => {
    console.log("Data from trials Data", data)
    let memType = data[0]?.membership
    let expiry = data[0]?.expires_on.split('-')
    console.log(expiry)

    return (
        <div className="flex flex-col bg-[#f7f6f2] rounded-2xl items-center justify-center mt-8 py-10 shadow-xl w-[80%] mx-auto max-w-[600px]">
          <h1 className="text-[#2D2D2D] font-Poppins text-5xl font-extrabold py-6 text-center">
            Your Trials
          </h1>
          <p className="text-[#3a6f5e] font-Poppins text-3xl font-semibold text-center">
            {memType}
          </p>
          <p className="text-[#6e7a5e] mt-4 text-xl text-center font-medium">
            {`Expires on ${expiry[0]}-${expiry[1]}-${expiry[2]}`}
          </p>
          <div className="mt-6 bg-gradient-to-r from-[#65a30d] to-[#3b4e22] text-white rounded-lg px-6 py-3 shadow-md hover:scale-105 transition-all duration-300">
            <button className="text-lg font-medium">Become a Member</button>
          </div>
        </div>
      );
}

export default TrialsData