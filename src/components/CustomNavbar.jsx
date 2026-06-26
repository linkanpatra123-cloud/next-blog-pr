"use client";
import Link from 'next/link';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/blogSlice';

export default function CustomNavbar() {
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} href="/" className="fw-bold fs-3 text-info">
          My Blog
        </Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
            <Form 
                className="d-flex border border-secondary rounded-pill px-3 py-1 custom-search-form"
                style={{ width: '400px', maxWidth: '100%' }}
            >
                <Form.Control
                type="search"
                placeholder="Search Blogs..."
                className="bg-transparent border-0 custom-search-input shadow-none"
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
                <Button variant="link" className="text-info p-0 ms-2">
                <FaSearch />
                </Button>
            </Form>
          <Link href="/create">
            <Button className="btn-bottom-fill fill-primary rounded-pill px-3 fw-bold shadow">
              <FaPlus size={13}/> Create
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}