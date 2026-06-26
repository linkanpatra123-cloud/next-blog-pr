import { FaSearch, FaBan } from 'react-icons/fa';

export default function EmptyState() {
  return (
    <div className="text-center mt-5">
      <div 
        className="d-inline-flex justify-content-center align-items-center" 
        style={{ width: '80px', height: '80px' }}>
        <FaBan size={50} color="grey" />
      </div>
      <h3 className="fw-bold text-secondary">No Data Found</h3>
    </div>
  );
}