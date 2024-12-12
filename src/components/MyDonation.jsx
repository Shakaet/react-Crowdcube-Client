import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider";
import { useLoaderData } from "react-router-dom";

const MyDonation = () => {
    let connectionData= useLoaderData()

    let {user}= useContext(AuthContext)

    let [donation,setDonation]=useState([])

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const response = await fetch(`https://react-firebase-mongo-node-server.vercel.app/donated-collection?donorEmail=${user.email}`);
                const data = await response.json();
                setDonation(data);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            } finally {
                //
            }
        };

        if (user?.email) {
            fetchDonation();
        }
    }, [user]);



 

  if (donation.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">
          You haven't made any donations yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen p-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-700 mb-6">
        My Donations
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donation.map((donation) => (
          <div
            key={donation._id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-bold text-yellow-600 mb-2">
              {donation.title}
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Type:</strong> {donation.type}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Donated By:</strong>{" "}
              {donation.donorName || "Anonymous"}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Donor Email:</strong> {donation.donorEmail}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Minimum Donation:</strong> ${donation.minDonation}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Deadline:</strong> {donation.deadline}
            </p>
            <p className="text-sm text-gray-500 italic">
              <strong>Donation Date:</strong>{" "}
              {new Date(donation.donationDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonation;
