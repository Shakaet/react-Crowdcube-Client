import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./Provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateCampaign = () => {
  const { id } = useParams(); // Campaign ID from route
  const { user } = useContext(AuthContext); // Authenticated user
  const [campaign, setCampaign] = useState({});
  const navigate = useNavigate();


  // Fetch existing campaign data
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`https://react-firebase-mongo-node-server.vercel.app/myCampaign/${id}`);
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };

    fetchCampaign();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedCampaign = {
      ...campaign,
      image: form.image.value,
      title: form.title.value,
      type: form.type.value,
      description: form.description.value,
      minDonation: form.minDonation.value,
      deadline: form.deadline.value,
    };

    fetch(`https://react-firebase-mongo-node-server.vercel.app/updateCampaign/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampaign),
      })
        .then((res) => {
          return res.json(); // Ensure the response is returned
        })
        .then((data) => {
          if (data.modifiedCount > 0) { // Check if the update was successful
           
            toast.success("Campaign updated successfully!");
            navigate("/myCampaigns"); // Navigate to the campaigns page after success
          } else {
            toast.error("No changes were made to the campaign.");
          }
        })
        .catch((error) => {
          console.error("Error updating campaign:", error);
          toast.error("Failed to update the campaign.");
        });
      
      
      
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Update Campaign
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
              defaultValue={campaign.image || ""}
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
              defaultValue={campaign.title || ""}
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className="block font-medium mb-2">Campaign Type</label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              defaultValue={campaign.type || ""}
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
              defaultValue={campaign.description || ""}
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
              defaultValue={campaign.minDonation || ""}
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
              defaultValue={campaign.deadline || ""}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCampaign;
