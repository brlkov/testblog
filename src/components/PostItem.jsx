import React from 'react';
import MyButton from "./UI/Button/MyButton";
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="Post">
                <div className="PostContent">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <div>{props.post.body}</div>
                </div>
                <div className="PostButtons">
                    <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
                    <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
