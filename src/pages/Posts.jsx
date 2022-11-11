import React, {useEffect, useMemo, useState} from 'react'
import axios from "axios";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Pagination from "../components/UI/Pagination/Pagination";
import MyModal from "../components/UI/Modal/MyModal";
import MyButton from "../components/UI/Button/MyButton";
import MyLoader from "../components/UI/Loader/MyLoader";
import Canvas from "../components/Canvas";
import {useFetching} from "../hooks/useFetching";
import {useNavigate} from "react-router-dom";
import "../styles/App.css"


function Posts() {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:'', search:''})
    const [modal, setModal] = useState(false)

    const [totalPosts, setTotalPosts] = useState(0)
    const limit = 10
    const [totalPages , setTotalPages] = useState(0)
    const [page, setPage] = useState(1)

    const [fetchPosts, loading, error] = useFetching(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',
            {params: {_limit: limit, _page: page}})
        const totalCount = response.headers['x-total-count']
        setTotalPosts(Number(totalCount))
        setTotalPages(Math.ceil(totalCount/limit))
        setPosts(response.data)
    })

    useEffect(() => {
        fetchPosts()
    },[page])

    const pagesArray = useMemo(() => {
        const result = []
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)
        }
        return result
    },[totalPages])



    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortedPosts = useMemo(()=> {
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.search))
    }, [filter.search, sortedPosts])



    return (
        <div className="Posts">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <MyButton onClick={() => setModal(true)}>Add new post</MyButton>
                <MyButton onClick={() => navigate('/about')}>About</MyButton>
            </div>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm totalPosts={totalPosts} create={createPost}/>
            </MyModal>
            <h2>Posts list</h2>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {error && <h2>{error}</h2>}
            {loading
                ? <div className="loader">
                    <MyLoader/>
                </div>
                : (filter.search === "lera" || filter.search === "Lera" || filter.search === "лера" || filter.search === "Лера") ? <Canvas/>
                : <div>
                        <PostList remove={removePost} posts = {sortedAndSearchedPosts}/>
                        <Pagination pagesArray={pagesArray} page={page} setPage={setPage}/>
                </div>
            }
        </div>
    );
}

export default Posts;
