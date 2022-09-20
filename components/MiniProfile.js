import { useSession, signOut } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  console.log("MiniProfile session");
  console.log(session);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image || "https://links.papareact.com/3ke"}
        alt="profile pic"
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-16 h-16 p-[2px] rounded-full object-contain border cursor-pointer"
      />
      <div className="flex-col mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button onClick={signOut} className="font-semibold text-blue-400 text-sm">
        Sign Out
      </button>
    </div>
  );
}

export default MiniProfile;
