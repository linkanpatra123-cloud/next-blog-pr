"use client";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../../../redux/blogSlice';
import { useRouter, useParams } from 'next/navigation';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function EditBlog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
    tags: '',
    date: ''
  });
  const [loading, setLoading] = useState(true);

  // Existing blog ka data fetch karna
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);
        const blogData = response.data;
        // Tags array ko wapas comma separated string me convert karna
        setFormData({
          ...blogData,
          tags: blogData.tags ? blogData.tags.join(', ') : ''
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog", error);
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.category === '') {
      alert("Please select a category!");
      return;
    }

    const updatedBlog = {
      ...formData,
      id: id,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
    };
    
    dispatch(updateBlog(updatedBlog));
    router.push('/'); // Update hone ke baad Home page par bhejein
  };

  if (loading) return <p className="text-center text-white mt-5">Loading form...</p>;

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Card bg="dark" text="white" className="w-75 border-secondary p-4 shadow-lg">
        <h3 className="mb-4 text-center">Edit Blog</h3>
        <Form onSubmit={handleSubmit}>
          
          {/* ... (Create page ki tarah same Form Groups rakhein) ... */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" required placeholder="Enter blog title" 
                  className="bg-black text-white border-secondary"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select 
                  className="bg-black text-white border-secondary"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Businesses">Businesses</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Lifestyle">Lifestyle</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control 
                  type="url" placeholder="https://example.com/image.jpg" 
                  className="bg-black text-white border-secondary"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" required className="bg-black text-white border-secondary"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Tags (Comma separated)</Form.Label>
            <Form.Control 
              type="text" placeholder="e.g. Nextjs, React, Web Dev" 
              className="bg-black text-white border-secondary"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Content</Form.Label>
            <Form.Control 
              as="textarea" rows={6} required className="bg-black text-white border-secondary"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </Form.Group>

          <Button variant="warning" type="submit" className="w-10 fw-bold py-2 px-4 rounded-pill">
            Update
          </Button>
          
        </Form>
      </Card>
    </div>
  );
}