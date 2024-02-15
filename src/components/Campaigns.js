import React, { useState, useEffect } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [minGoal, setMinGoal] = useState('');
  const [maxGoal, setMaxGoal] = useState('');
  const [ordering, setOrdering] = useState('');

  useEffect(() => {
    let url = 'http://localhost:8000/api/campaigns/';

    const params = [];
    if (minGoal) params.push(`min_goal=${minGoal}`);
    if (maxGoal) params.push(`max_goal=${maxGoal}`);
    if (ordering) params.push(`ordering=${ordering}`);

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCampaigns(data));
  }, [minGoal, maxGoal, ordering]);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-600">Campaigns</h1>
      <div className="flex space-x-4 mb-8 bg-white p-4 rounded-xl shadow-lg">
        <input
          type="number"
          placeholder="Minimum Goal"
          value={minGoal}
          onChange={(e) => setMinGoal(e.target.value)}
          className="p-2 rounded-full border bg-indigo-50 w-1/4 focus:ring focus:ring-indigo-200"
        />
        <input
          type="number"
          placeholder="Maximum Goal"
          value={maxGoal}
          onChange={(e) => setMaxGoal(e.target.value)}
          className="p-2 rounded-full border bg-indigo-50 w-1/4 focus:ring focus:ring-indigo-200"
        />
        <select 
          value={ordering} 
          onChange={(e) => setOrdering(e.target.value)}
          className="p-2 rounded-full border bg-indigo-50 w-1/4 focus:ring focus:ring-indigo-200"
        >
          <option value="">Order By</option>
          <option value="goal">Goal</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-indigo-600">{campaign.title}</h3>
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
