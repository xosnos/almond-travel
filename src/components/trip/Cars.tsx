import React from 'react';
import { Button, Col, Row, Form, Spinner } from 'react-bootstrap';
import { TripItem } from '../../types/index';

interface CarsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Cars: React.FC<CarsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (car: TripItem, field: string): string => {
    return car[field] ?? '';
  };

  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Cars</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="cars-container">
        {items.length === 0 ? (
          <div className="alert alert-info mb-3">No cars added yet. Click "Add a Car" to get started!</div>
        ) : (
          items.map((car, index) => (
            <div
              key={index}
              className="car-card p-3 mb-3 border border-light rounded-3"
              style={{
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderLeft: '4px solid #fd7e14'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-secondary">
                  <i className="bi bi-car-front-fill text-warning me-2"></i>Car #{index + 1}
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
                  title="Remove car"
                >
                  ✕
                </Button>
              </div>

              {/* Pick Up Section */}
              <div className="mb-3 p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Pick Up
                </h6>
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(car, 'pickUpDate')}
                        onChange={(e) => handleUpdate(index, 'pickUpDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={getFieldValue(car, 'pickUpTime')}
                        onChange={(e) => handleUpdate(index, 'pickUpTime', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="LAX Parking Garage A"
                        value={getFieldValue(car, 'pickUpLocation')}
                        onChange={(e) => handleUpdate(index, 'pickUpLocation', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Return Section */}
              <div className="mb-3 p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Return
                </h6>
                <Row>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(car, 'returnDate')}
                        onChange={(e) => handleUpdate(index, 'returnDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={getFieldValue(car, 'returnTime')}
                        onChange={(e) => handleUpdate(index, 'returnTime', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Hae Jang Chon KBBQ Restaurant in Koreatown"
                        value={getFieldValue(car, 'returnLocation')}
                        onChange={(e) => handleUpdate(index, 'returnLocation', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Vehicle Details */}
              <div className="p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Vehicle Details
                </h6>
                <Form.Group className="mb-0">
                  <Form.Label className="small fw-semibold">Make, Model & Year</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tesla Model S 2023"
                    value={getFieldValue(car, 'carMakeModelYear')}
                    onChange={(e) => handleUpdate(index, 'carMakeModelYear', e.target.value)}
                    disabled={loading}
                    className="border-light shadow-sm"
                  />
                </Form.Group>
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
          backgroundColor: '#fd7e14',
          border: 'none'
        }}
      >
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Adding Car...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i>Add a Car
          </>
        )}
      </Button>
    </div>
  );
};
