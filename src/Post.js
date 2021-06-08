import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase.js";
import { Button } from "@material-ui/core";
import firebase from "firebase";

function Post(props) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(props.postId);
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => unsubscribe();
  }, [props.postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      username: props.signedInUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt="Username" src="" />
        <h3>{props.username}</h3>
      </div>

      <img className="post_image" src={props.imgUrl} alt="post"></img>

      <h4 className="post_text">
        <strong>{props.username}</strong> {props.caption}
      </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="post_commentBox">
        <input
          className="post_comment_input"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          className="post_comment_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default Post;
