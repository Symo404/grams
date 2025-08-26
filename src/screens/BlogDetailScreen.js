import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

// --- Define the backend URL ---
const backendUrl = 'http://localhost:5000';

const BlogDetailScreen = () => {
  const { blogId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // --- FIX: Add a unique parameter to prevent caching ---
        const response = await axios.get(`/api/blogs/${blogId}`, {
          params: {
            '_': Date.now()
          }
        });
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
}, [blogId]);

  if (isLoading) {
    return (
        <>
            <Navbar />
            <div className="blog-detail-container">Loading post...</div>
            <Footer />
        </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="blog-detail-container not-found">
          <h2>Post not found</h2>
          <Link to="/blog">Back to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="blog-detail-container">
        <header className="blog-detail-header">
          <h1>{post.title}</h1>
          <p className="blog-detail-tagline">{post.tagline}</p>
        </header>

        {/* --- FIX: Prepend the backend URL to the hero image path --- */}
        <img src={`${backendUrl}${post.image}`} alt={post.title} className="blog-detail-hero-image" />

        <main className="blog-detail-content">
          {/* This logic correctly renders the content array */}
          {post.content && post.content.map((block, index) => {
            if (block.type === 'subheading') {
              return <h2 key={index}>{block.text}</h2>;
            }
            return <p key={index}>{block.text}</p>;
          })}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailScreen;