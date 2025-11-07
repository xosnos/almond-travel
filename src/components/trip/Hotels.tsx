import React from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { TripItem } from '../../types/index';

interface HotelsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Hotels: React.FC<HotelsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (hotel: TripItem, field: string): string => {
    return hotel[field] ?? '';
  };

  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Hotels</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="hotels-container">
        {items.length === 0 ? (
          <div className="alert alert-info mb-3">No hotels added yet. Click "Add a Hotel" to get started!</div>
        ) : (
          items.map((hotel, index) => (
            <div
              key={index}
              className="hotel-card p-3 mb-3 border border-light rounded-3"
              style={{
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderLeft: '4px solid #198754'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-secondary">
                  <i className="bi bi-building text-success me-2"></i>Hotel #{index + 1}
                </h4>
                <Button
                  className="rounded-circle p-0"
                  variant="outline-danger"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  style={{
                    width: '36px',
                    height: '36px',
                    transition: 'all 0.2s ease'
                  }}
                  title="Remove hotel"
                >
                  ✕
                </Button>
              </div>

              {/* Check-in/Check-out Dates */}
              <div className="mb-3 p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Dates
                </h6>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">Check In Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(hotel, 'checkInDate')}
                        onChange={(e) => handleUpdate(index, 'checkInDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">Check Out Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(hotel, 'checkOutDate')}
                        onChange={(e) => handleUpdate(index, 'checkOutDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Hotel Details */}
              <div className="p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Hotel Information
                </h6>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Hotel Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="The Plaza"
                        value={getFieldValue(hotel, 'hotelName')}
                        onChange={(e) => handleUpdate(index, 'hotelName', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="768 5th Ave"
                        value={getFieldValue(hotel, 'hotelAddress')}
                        onChange={(e) => handleUpdate(index, 'hotelAddress', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="New York"
                        value={getFieldValue(hotel, 'hotelCity')}
                        onChange={(e) => handleUpdate(index, 'hotelCity', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 shadow-sm"
        style={{
          transition: 'all 0.3s ease',
          backgroundColor: '#198754',
          border: 'none'
        }}
      >
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Adding Hotel...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i>Add a Hotel
          </>
        )}
      </Button>
    </div>
  );
};
