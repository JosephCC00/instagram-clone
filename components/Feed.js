import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  return (
    /** By default grid is a one-column grid */
    // <main
    //   className={`grid grid-cols-1 mx-auto ${
    //     session ? "xl:grid-cols-3" : "xl:grid-cols-2"
    //   } md:grid-cols-2 md:max-w-3xl  xl:max-w-6xl`}
    // >
    <main
      className={`grid grid-cols-1 mx-auto xl:grid-cols-3 md:grid-cols-2 md:max-w-3xl xl:max-w-6xl
      ${!session && "!grid-cols-1 !max-w-3xl"}`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="hidden xl:inline-grid md:col-span-1 ">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
