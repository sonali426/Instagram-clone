import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./firebase.js";
import firebase from "firebase";
import "./imageUpload.css";

function ImageUpload(props) {
  const [imageCaption, setImageCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete upload function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: imageCaption,
              imageUrl: url,
              username: props.username,
            });
            setProgress(0);
            setImageCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="image_upload">
      <progress className="progress_bar" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setImageCaption(event.target.value)}
        value={imageCaption}
      />
      <Input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}> Upload </Button>
    </div>
  );
}

export default ImageUpload;
