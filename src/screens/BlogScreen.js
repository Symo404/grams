import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

// --- Define the backend URL ---
const backendUrl = 'http://localhost:5000';

const BlogScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/blogs');
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const postsByCategory = useMemo(() => {
    return posts.reduce((acc, post) => {
      const category = post.category || 'General';
      if (!acc[category]) acc[category] = [];
      acc[category].push(post);
      return acc;
    }, {});
  }, [posts]);

  if (isLoading) {
    return (
        <>
            <Navbar />
            <div className="blog-page-container" style={{ textAlign: 'center' }}>Loading posts...</div>
            <Footer />
        </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="blog-page-container">
        {Object.keys(postsByCategory).map(category => (
          <section key={category} className="blog-category-section">
            <div className="category-title">
              <h2>{category}</h2>
            </div>
            <div className="blog-grid">
              {postsByCategory[category].map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="blog-card-link">
                  <div className="blog-card">
                    {/* --- FIX: Prepend the backend URL to the image path --- */}
                    <img src={`${backendUrl}${post.image}`} alt={post.title} className="blog-card-image" />
                    <div className="blog-card-text">
                      <h3>{post.title}</h3>
                      <p>{post.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogScreen;