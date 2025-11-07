import React from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { TripItem } from '../../types/index';

interface FlightsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Flights: React.FC<FlightsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (flight: TripItem, field: string): string => {
    return flight[field] ?? '';
  };

  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Flights</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="flights-container">
        {items.length === 0 ? (
          <div className="alert alert-info mb-3">No flights added yet. Click "Add a Flight" to get started!</div>
        ) : (
          items.map((flight, index) => (
            <div
              key={index}
              className="flight-card p-3 mb-3 border border-light rounded-3"
              style={{
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderLeft: '4px solid #0d6efd'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-secondary">
                  <i className="bi bi-airplane-fill text-primary me-2"></i>Flight #{index + 1}
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
                  title="Remove flight"
                >
                  ✕
                </Button>
              </div>

              {/* Departure Section */}
              <div className="mb-3 p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Departure
                </h6>
                <Row>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(flight, 'departureDate')}
                        onChange={(e) => handleUpdate(index, 'departureDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={getFieldValue(flight, 'departureTime')}
                        onChange={(e) => handleUpdate(index, 'departureTime', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Airport Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="SGN"
                        value={getFieldValue(flight, 'departureAirport')}
                        onChange={(e) => handleUpdate(index, 'departureAirport', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ho Chi Minh City"
                        value={getFieldValue(flight, 'departureCity')}
                        onChange={(e) => handleUpdate(index, 'departureCity', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Arrival Section */}
              <div className="p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Arrival
                </h6>
                <Row>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(flight, 'arrivalDate')}
                        onChange={(e) => handleUpdate(index, 'arrivalDate', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={getFieldValue(flight, 'arrivalTime')}
                        onChange={(e) => handleUpdate(index, 'arrivalTime', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Airport Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="GRR"
                        value={getFieldValue(flight, 'arrivalAirport')}
                        onChange={(e) => handleUpdate(index, 'arrivalAirport', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Grand Rapids"
                        value={getFieldValue(flight, 'arrivalCity')}
                        onChange={(e) => handleUpdate(index, 'arrivalCity', e.target.value)}
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
          backgroundColor: '#0d6efd',
          border: 'none'
        }}
      >
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Adding Flight...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i>Add a Flight
          </>
        )}
      </Button>
    </div>
  );
};
