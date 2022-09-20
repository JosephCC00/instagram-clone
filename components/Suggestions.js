import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  // populate list of these fake users
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      companyName: faker.company.name(),
    }));
    console.log(suggestions);
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm text-gray-400 font-bold">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div key={profile.userId} className="flex items-center my-2">
          <img
            src={profile.avatar}
            alt=""
            className="w-10 h-10 p-[2px] rounded-full border cursor-pointer"
          />
          <div className="flex-col flex-1 ml-4">
            <h2 className="text-sm font-semibold">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">{profile.companyName}</h3>
          </div>
          <button className="text-xs font-bold text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
