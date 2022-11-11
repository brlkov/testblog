import React from 'react'
import "./styles/App.css"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostID from "./pages/PostID";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route exact path="/posts" element={<Posts/>}/>
                <Route exact path="/posts/:id" element={<PostID/>}/>
                <Route path="*" element={<Navigate replace to="/posts"/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
