import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllCampaign = () => {
  const data = useLoaderData();
  const [campaigns, setCampaigns] = useState(data);

  const handleSortByMinDonation = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => a.minDonation - b.minDonation);
    setCampaigns(sortedCampaigns);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            All Campaigns
          </h2>
          <button
            onClick={handleSortByMinDonation}
            className="mt-4 sm:mt-0 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Sort by Minimum Donation
          </button>
        </div>

        {/* Table for displaying campaigns */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Min Donation</th>
                <th className="py-2 px-4 border-b text-left">Deadline</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <tr key={campaign._id}>
                    <td className="py-2 px-4 border-b break-words">{campaign.title}</td>
                    <td className="py-2 px-4 border-b break-words">{campaign.type}</td>
                    <td className="py-2 px-4 border-b break-words">{campaign.description}</td>
                    <td className="py-2 px-4 border-b break-words">${campaign.minDonation}</td>
                    <td className="py-2 px-4 border-b break-words">{campaign.deadline}</td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/details/${campaign._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        See More
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-2 px-4 border-b text-center">
                    No campaigns available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCampaign;
