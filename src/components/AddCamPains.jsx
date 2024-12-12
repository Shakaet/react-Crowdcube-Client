import React, { useContext } from "react";
import Swal from 'sweetalert2';

import { AuthContext } from "./Provider";
import { useNavigate } from "react-router-dom";

const AddCamPains = () => {
  let { user } = useContext(AuthContext);

  let li=useNavigate()
     
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
  
    let image = form.image.value;
    let title = form.title.value;
    let type = form.type.value;
    let description = form.description.value;
    let minDonation = form.minDonation.value;
    let deadline = form.deadline.value;
    let email = user?.email;
    let name = user?.displayName;
    
    const campaignData = {
      image,
      title,
      type,
      description,
      minDonation,
      deadline,
      email,
      name,
    };
  
 
  
    fetch("https://react-firebase-mongo-node-server.vercel.app/addcampaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    })
      .then((response) => response.json())
      .then((data) => {
      
        if (data.insertedId) {
          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Campaign Added',
            text: 'The campaign added successfully!',
          });
          li("/allcampaign")

        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show error message using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error adding the campaign.',
        });
      });
  };
  
  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Add New Campaign
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image URL */}
          <div>
            <label className="block font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              placeholder="Enter image URL"
            />
          </div>

          {/* Campaign Title */}
          <div>
            <label className="block font-medium mb-2">Campaign Title</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              placeholder="Enter campaign title"
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className="block font-medium mb-2">Campaign Type</label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="personal issue">Personal Issue</option>
              <option value="startup">Startup</option>
              <option value="business">Business</option>
              <option value="creative ideas">Creative Ideas</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              placeholder="Enter campaign description"
            />
          </div>

          {/* Minimum Donation */}
          <div>
            <label className="block font-medium mb-2">Minimum Donation</label>
            <input
              type="number"
              name="minDonation"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              placeholder="Enter minimum donation amount"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block font-medium mb-2">Deadline</label>
            <input
              type="date"
              name="deadline"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* User Email (Read Only) */}
          <div>
            <label className="block font-medium mb-2">User Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* User Name (Read Only) */}
          <div>
            <label className="block font-medium mb-2">User Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCamPains;
