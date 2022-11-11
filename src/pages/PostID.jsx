import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import axios from "axios";
import MyLoader from "../components/UI/Loader/MyLoader";
import "../styles/App.css"


const PostId = () => {
    const [post, setPost] = useState({})
    const params = useParams()

    const [fetchPostByID, loading, error] = useFetching(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + params.id)
        setPost(response.data)
    })

    useEffect(() => {
        fetchPostByID()
    }, [])

    return (
        <div className="OnePost">
            <h2>Page for post with ID {params.id}</h2>
            {error && <h2>{error}</h2>}
            {loading
                ? <div className="loader">
                    <MyLoader/>
                </div>
                : <p>{post.title}<br/><br/>{post.body}</p>
            }
        </div>
    );
};

export default PostId;