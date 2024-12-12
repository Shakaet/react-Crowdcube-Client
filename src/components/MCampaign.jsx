import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Provider';
import Swal from 'sweetalert2';  // Import SweetAlert2

const MCampaign = () => {

  const { user } = useContext(AuthContext);
  const [campaign, setCampaign] = useState([]);

  const handleDelete = (id) => {
    // SweetAlert2 confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the deletion if confirmed
        fetch(`https://react-firebase-mongo-node-server.vercel.app/myCampaign/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
         
            setCampaign((prevCampaigns) =>
              prevCampaigns.filter((campaign) => campaign._id !== id)
            );
            Swal.fire('Deleted!', 'Your campaign has been deleted.', 'success');  // Show success message
          })
          .catch((error) => {
            console.error("Error deleting campaign:", error);
            Swal.fire('Error!', 'There was an issue deleting the campaign.', 'error');  // Show error message
          });
      } else {
        // If the user clicks "Cancel"
        Swal.fire('Cancelled', 'Your campaign is safe :)', 'info');
      }
    });
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`https://react-firebase-mongo-node-server.vercel.app/myCampaign?email=${user.email}`);
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    if (user?.email) {
      fetchCampaigns();
    }
  }, [user]);

  return (


    
    <div>

      {
        campaign.length== 0  && <h1 className='mt-10 text-center text-5xl font-extrabold flex items-center justify-center'>There are no Data Present</h1>
      }
      {
        campaign.length>0 && <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">My Campaigns</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-sm sm:text-base">Title</th>
                <th className="border px-4 py-2 text-sm sm:text-base">Type</th>
                <th className="border px-4 py-2 text-sm sm:text-base">Donation</th>
                <th className="border px-4 py-2 text-sm sm:text-base">Deadline</th>
                <th className="border px-4 py-2 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaign.map((campaign) => (
                <tr key={campaign._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm sm:text-base">{campaign.title}</td>
                  <td className="border px-4 py-2 text-sm sm:text-base">{campaign.type}</td>
                  <td className="border px-4 py-2 text-sm sm:text-base">${campaign.minDonation}</td>
                  <td className="border px-4 py-2 text-sm sm:text-base">{campaign.deadline}</td>
                  <td className="border px-4 py-2 text-sm sm:text-base">
                    <div className="flex flex-wrap gap-2 justify-start">
                      <Link
                        to={`/updateCampaign/${campaign._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-600 transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(campaign._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
  );
};

export default MCampaign;
