"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function BlogDetail() {
  const params = useParams();
  const { id } = params;
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleBlog();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-5 text-white">Loading Blog Details...</p>;
  if (!blog) return <p className="text-center mt-5 text-danger">Blog not found!</p>;

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: '800px' }}>
      <Link href="/">
        <Button className="mb-4 rounded-pill">
          <FaArrowLeft/> Back
        </Button>
      </Link>

      {/* Main Image */}
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="img-fluid rounded mb-4 w-100" 
          style={{ maxHeight: '400px', objectFit: 'cover' }} 
        />
      )}

      <div className="mb-4">
        <h1 className="fw-bold text-white mb-2">{blog.title}</h1>
        <div className="d-flex align-items-center gap-3 text-muted">
          <span className="text-info fw-bold">{blog.category}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>
        
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-3">
            {blog.tags.map((tag, index) => (
              <Badge bg="dark" border="secondary" className="me-2 border" key={index}>
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <hr className="border-secondary" />

      <div className="text-white mt-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>
      </div>
    </div>
  );
}