import React from 'react';
import { Form } from 'react-bootstrap';

interface SummaryProps {
  name: string;
  location: string;
  handleUpdate: (field: 'name' | 'location', value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Summary: React.FC<SummaryProps> = ({
  name,
  location,
  handleUpdate,
  loading = false,
  error = null
}) => {
  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Trip Summary</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <Form>
        <Form.Group controlId="formGroupName" className="mb-3">
          <Form.Label className="fw-semibold">Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip name (e.g., Summer Vacation 2024)"
            value={name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            disabled={loading}
            className="border-light shadow-sm"
            style={{
              transition: 'all 0.3s ease',
              borderColor: error ? '#dc3545' : undefined
            }}
          />
        </Form.Group>

        <Form.Group controlId="formGroupLocation" className="mb-0">
          <Form.Label className="fw-semibold">Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip location (e.g., Tokyo, Japan)"
            value={location}
            onChange={(e) => handleUpdate('location', e.target.value)}
            disabled={loading}
            className="border-light shadow-sm"
            style={{
              transition: 'all 0.3s ease',
              borderColor: error ? '#dc3545' : undefined
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};
