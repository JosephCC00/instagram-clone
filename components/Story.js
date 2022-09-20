import Image from "next/image";

function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt=""
        layout="fill"
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-14 w-14 rounded-full p-[2px] border border-[2.5px] border-red-400 cursor-pointer transition transform duration-200 ease-out hover:scale-110 "
      />

      <div className="w-14 text-xs truncate text-center">{username}</div>
    </div>
  );
}

export default Story;
