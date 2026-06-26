"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, setCategoryFilter, setSortBy, deleteBlog } from '../redux/blogSlice'; 
import { Button, Form, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { FaTrash, FaEdit, FaCalendarAlt } from 'react-icons/fa'; 
import EmptyState from '../components/EmptyState';

const categories = ['All', 'Technology', 'Fashion', 'Businesses', 'Travel', 'Food', 'Lifestyle'];

export default function Home() {
  const dispatch = useDispatch();
  const { blogs, status, searchQuery, categoryFilter, sortBy } = useSelector((state) => state.blog);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  
  let filteredBlogs = [...safeBlogs].filter((blog) => {
    const title = blog?.title ? String(blog.title) : '';
    const category = blog?.category ? String(blog.category) : '';
    const search = searchQuery ? String(searchQuery) : '';

    const matchesCategory = categoryFilter === 'All' || category === categoryFilter;
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) || 
                          category.toLowerCase().includes(search.toLowerCase());
                          
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'latest') {
    filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'oldest') {
    filteredBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'asc') {
    filteredBlogs.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (sortBy === 'desc') {
    filteredBlogs.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div className="d-flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button 
              key={cat} 
              variant={categoryFilter === cat ? "primary" : "dark"} 
              className="rounded-pill border-secondary"
              onClick={() => dispatch(setCategoryFilter(cat))}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div>
          <Form.Select 
            className="bg-dark text-white border-secondary rounded-pill"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="latest">Latest First</option>
            <option value="oldest"> Oldest First</option>
            <option value="asc"> A-Z</option>
            <option value="desc"> Z-A </option>
          </Form.Select>
        </div>
      </div>

      <h2 className="text-center fw-bold mb-4">Blogs</h2>

      {status === 'loading' ? (
        <p className="text-center mt-5">Loading...</p>
      ) : filteredBlogs.length > 0 ? (
        <div className="row g-4 mb-5">
          {filteredBlogs.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              <Card bg="dark" text="white" className="h-100 border-secondary d-flex flex-column position-relative blog-card-hover">
                
                <div className="position-absolute top-0 end-0 p-2 d-flex gap-2" style={{ zIndex: 10 }}>
                  <Link href={`/edit/${blog.id}`}>
                    <Button variant="warning" size="sm" className="rounded-circle shadow">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    className="rounded-circle shadow"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>

                {/* Blog Image */}
                {blog.image && (
                   <Card.Img variant="top" src={blog.image} style={{ height: '250px', objectFit: 'cover', borderRadius: '12px' }} />
                )}
                
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                       {blog.date ? new Date(blog.date).toLocaleDateString() : 'No date'}
                    </small>
                  </div>
                  <Card.Title className="fw-bold">{blog.title}</Card.Title>
                  
                  {/* Blog Tags */}
                  {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="mb-2">
                      {blog.tags.map((tag, index) => (
                        <Badge bg="secondary" className="me-1" key={index}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                  
                  <Card.Text className="flex-grow-1">
                    {blog.content ? blog.content.substring(0, 80) : ''}...
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
                    <Card.Subtitle className="text-info fw-bold mb-0">
                      {blog.category}
                    </Card.Subtitle>
                      
                    <small className="text-secondary d-flex align-items-center gap-1">
                      <FaCalendarAlt />
                      {blog.date ? new Date(blog.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : 'No date'}
                    </small>
                  </div>

                  <Link href={`/blog/${blog.id}`} className="mt-auto">
                    <Button className="btn-bottom-fill fill-info w-10 rounded-pill mt-3 fw-bold shadow-sm">
                      Read More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}