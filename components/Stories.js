import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Story from "./Story";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  // populate list of these fake users
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions?.map((profile) => (
        <Story
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
        />
      ))}

      {/* <h1>{suggestions[0]?.userId}</h1> */}
    </div>
  );
}

export default Stories;
