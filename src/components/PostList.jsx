import React from 'react';
import PostItem from "./PostItem";

const PostList = (props) => {

    return (props.posts.length === 0) ?
        <div>
            <p>Empty</p>
        </div>
        :
        <div>
            {props.posts.map((post) =>
                <PostItem remove={props.remove} post={post} key={post.id}/>
            )}
        </div>
};

export default PostList;