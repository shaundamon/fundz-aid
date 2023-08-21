import React, { useEffect, useState } from 'react';

const FundraisingList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:8000/api/fundraisers/';

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error('An error occurred while fetching data:', error));
  }, []);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Fundraising Campaigns</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {campaigns.map((campaign, index) => {
          const percentage = Math.min((campaign.amount_fundraised / campaign.goal) * 100, 100);
          const isOverGoal = campaign.amount_fundraised > campaign.goal;

          return (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{campaign.title}</h2>
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              <div className="flex items-center">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="ml-2 text-sm">{percentage.toFixed(0)}%{isOverGoal && '+'}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-600">Raised: ${campaign.amount_fundraised}</span>
                <span className="text-gray-600">Goal: ${campaign.goal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FundraisingList;
