import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './app/components/PostList.js';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [sortByTitle, setSortByTitle] = useState(false);
    

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleOrderClick = () => {
        setSortByTitle(!sortByTitle);
    };

    const sortedPosts = posts.slice().sort((a, b) => {
        if (sortByTitle) {
            return a.title > b.title ? 1 : -1;
        } else {
            return a.body > b.body ? 1 : -1;
        }
    });

    return (
        <div>
            <h1>Posts</h1>
            <button onClick={handleOrderClick}>Order by Title</button>
            <ul>
                {sortedPosts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Posts; 