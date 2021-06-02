import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post(props) {
    return (
        <div className = "post" >

            <div className="post_header">
            <Avatar className = "post_avatar" alt = "Username" src = "" />
            <h3>{props.username}</h3>
            </div> 
    
            <img className = "post_image" src = {props.imgUrl} alt = "post"></img>

            <h4 className="post_text"><strong>{props.username}</strong>{props.caption}</h4>
        </div>
    )
}

export default Post
