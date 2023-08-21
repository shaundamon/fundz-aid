import React, { useState, useEffect } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/campaigns/')
      .then((response) => response.json())
      .then((data) => setCampaigns(data));
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <div className="mt-2 flex justify-between">
              <span className="text-gray-600">Raised: ${campaign.amount_raised}</span>
              <span className="text-gray-600">Goal: ${campaign.goal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
