// import Image from "next/image";
import {
  EllipsisHorizontalIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/24/solid";
import {
  onSnapshot,
  addDoc,
  query,
  orderBy,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  // comment to send
  const [comment, setComment] = useState("");
  // comments on firebase to display
  const [comments, setComments] = useState([]);
  // likes state
  const [likes, setLikes] = useState([]);
  // we need this has like state to check if it's the user who has liked/not liked
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    // since we are accessing the db, we have to add db to the dependencies list, id is also a dependency we must factor in,
    // essentially anything that u use outside of this component needs to be on the list
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    // since we are accessing the db, we have to add db to the dependencies list, id is also a dependency we must factor in,
    // essentially anything that u use outside of this component needs to be on the list
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        // it will return a -1 if it coudln't find an index, otherwise it would return the index in which it found from list
        // option chaining is to safely accessing object value
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    // this will prevent page from refreshing when we send the comment, you want to be super clean when you do that
    e.preventDefault();

    //super responsive, we do this to prevent spamming the key
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="min-w-full my-7 bg-white border rounded-sm">
      {/* header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          lazy="loading"
          referrerPolicy="no-referrer"
          className="w-12 h-12 p-1 mr-3 rounded-full object-contain border cursor-pointer"
        />
        <p className="flex-1 font-bold ">{username}</p>
        <EllipsisHorizontalIcon className="h-6 w-6 cursor-pointer" />
      </div>

      {/* image */}
      <img
        src={img}
        alt=""
        lazy="loading"
        className="w-full max-h-96 object-cover"
      />

      {/* buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartFilledIcon onClick={likePost} className="btn" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatBubbleOvalLeftEllipsisIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate select-none">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
                referrerPolicy="no-referrer"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment interval={2000} fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            //since we are inside a form, we hit enter we want to submit
            type="submit"
            //disabled when .trim() so you can't spam a post
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
