import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import Post from "./Post";

// have dummy data here for now, will replace with firebase
// const posts = [
//   {
//     pid: "123",
//     username: "martinwong",
//     userImg: "https://links.papareact.com/3ke",
//     img: "https://links.papareact.com/3ke",
//     caption: "This is Dope!",
//   },
//   {
//     pid: "456",
//     username: "johndoe",
//     userImg: "https://links.papareact.com/3ke",
//     img: "https://links.papareact.com/3ke",
//     caption: "This is Dope!",
//   },
//   {
//     pid: "789",
//     username: "marywhite",
//     userImg: "https://links.papareact.com/3ke",
//     img: "https://links.papareact.com/3ke",
//     caption: "This is Dope!",
//   },
// ];

function Posts() {
  const [posts, setPosts] = useState([]);

  //i want to attach a listener to the backend database when the page loads up
  // useEffect(() => {
  // this is a new firebase v9 feature
  // the following returns a unubscribe object
  // const unsubscribe = onSnapshot(
  // query(collection(db, "posts"), orderBy("timestamp", "desc")),
  // if anytime the snapshot changes, real time give you new values
  //   (snapshot) => {
  //     setPosts(snapshot.docs);
  //   }
  // );

  // what you wanna do is to clean up your useEffect function everytime
  // so you never want to have more than one listener

  // return () => {
  //   unsubscribe();
  // };
  /** instead of above we can refactoring to the following  */
  // return unsubscribe;
  // }, [db]);

  /**
   * * This should be equivalent to "useCollection" in react-firebase-hooks/firestore
   */
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log("posts");
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
