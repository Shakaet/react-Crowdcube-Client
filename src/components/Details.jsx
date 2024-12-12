import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "./Provider"; // Assuming you have an AuthContext

const Details = () => {
  let data = useLoaderData();
  const { user } = useContext(AuthContext); // Fetch user details from context

  // Convert the campaign deadline to a Date object
  const campaignDeadline = new Date(data.deadline);
  const currentDate = new Date();

 

  const handleDonate = async () => {
    if (currentDate > campaignDeadline) {
      // If the current date is past the campaign deadline
      Swal.fire({
        icon: 'error',
        title: 'Campaign Closed',
        text: 'Sorry, this campaign has reached its deadline and can no longer accept donations.',
      });
      return; // Stop further execution
    }

    // Create the object to be sent to the database
    const donationData = {
      campaignId: data._id, // Use the campaign ID
      title: data.title,
      type: data.type,
      description: data.description,
      minDonation: data.minDonation,
      deadline: data.deadline,
      creatorEmail: data.email,
      donorEmail: user.email, // Logged-in user's email
      donorName: user.displayName || "Anonymous", // Logged-in user's name
      donationDate: new Date(), // Current date
    };

    fetch("https://react-firebase-mongo-node-server.vercel.app/donated-collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })
    .then((response) => response.json())
    .then((data) => {
      
      if(data.insertedId){
        Swal.fire({
          icon: 'success',
          title: 'Donation Successful',
          text: 'Thank you for your donation!',
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Donation Failed',
        text: 'There was an issue processing your donation. Please try again later.',
      });
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-700 mb-6">
            Campaign Title:{" "}
            <span className="text-yellow-600">{data.title}</span>
          </h2>
          <img className="mx-auto rounded-full mt-5 mb-5 w-32 h-32" src={data.image} alt="sorry,there are no image"></img>

          <div className="space-y-6">
            <p className="text-lg">
              <strong>Type:</strong>{" "}
              <span className="text-gray-700 font-extrabold">{data.type}</span>
            </p>
            <p className="text-lg">
              <strong>Description:</strong>{" "}
              <span className="text-gray-700 font-extrabold">
                {data.description}
              </span>
            </p>
            <p className="text-lg">
              <strong>Minimum Donation:</strong>{" "}
              <span className="text-green-600 font-extrabold">
                ${data.minDonation}
              </span>
            </p>
            <p className="text-lg">
              <strong>Deadline:</strong>{" "}
              <span className="text-red-600 font-extrabold">
                {data.deadline}
              </span>
            </p>
            <p className="text-lg">
              <strong>Created by:</strong>{" "}
              <span className="text-blue-600 font-extrabold">{data.name}</span>
            </p>
            <p className="text-lg">
              <strong>Email:</strong>{" "}
              <span className="text-gray-700 font-extrabold">{data.email}</span>
            </p>

            <button
              onClick={handleDonate}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
