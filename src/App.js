import './App.css';
import Post from './Post.js';
import React, { useState} from 'react'


function App() {
  const [posts, setPosts] = useState([
    {
      username :"Sonali",
      caption:" post 1",
      imgUrl:"https://www.freecodecamp.org/news/content/images/2021/05/common_mistakes.jpg"
    },
    {
      username:"Inaffairwithlife",
      caption :" post 2",
      imgUrl:"https://www.freecodecamp.org/news/content/images/2021/05/common_mistakes.jpg"
    },
    {
      username:"Amisha",
      caption:" post 3",
      imgUrl:"https://www.freecodecamp.org/news/content/images/2021/05/common_mistakes.jpg"
    }
  ]);

  return (
    <div className="App">
      <div className = "app_header">
        <img className="app_headerImage" src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = "Instagram"></img>
      </div>
      {
        posts.map(post => (
            <Post username = {post.username} caption={post.caption} imgUrl={post.imgUrl}></Post>
          )
        )
      }
    </div>
  );
}

export default App;
