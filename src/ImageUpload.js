import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import {storage, db} from "./firebase.js";
import firebase from 'firebase';

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
          (snapshot) =>{
              //progress function...
              const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100);
              setProgress(progress);
          },
          (error) => {
              console.log(error);
              alert(error.message);
          },
          () => {
              //complete upload function
              storage.ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url)=>{
                db.collection('posts').add({
                    timestamp: firebase.firestore.fieldValue.serverTimeStamp(),
                    caption: imageCaption,
                    imageUrl: url,
                    username: props.username
                })
              })
          }

      )
  };

  return (
    <div>
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
