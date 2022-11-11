import React, {useState} from 'react';
import MyInput from "./UI/Input/MyInput";
import MyButton from "./UI/Button/MyButton";
import classes from "./UI/Input/MyInput.module.css";


const PostForm = (props) => {

    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (event) => {
        event.preventDefault()
        const newPost = {
            id: props.totalPosts + 1,
            ...post
        }
        props.create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <div>
            <form>
                <h2>Add new post</h2>
                <MyInput
                    className={classes.myInp}
                    value={post.title}
                    onChange={event => setPost({...post, title: event.target.value})}
                    type="text"
                    placeholder="Name"
                />
                <MyInput
                    className={classes.myInp}
                    value={post.body}
                    onChange={event => setPost({...post, body: event.target.value})}
                    type="text"
                    placeholder="Description"
                />
                <MyButton onClick={addNewPost}>Add post</MyButton>
            </form>
        </div>
    );
};

export default PostForm;