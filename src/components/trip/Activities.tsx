import React from 'react';
import { Button, Col, Row, Form, Spinner } from 'react-bootstrap';
import { TripItem } from '../../types/index';

interface ActivitiesProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Activities: React.FC<ActivitiesProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (activity: TripItem, field: string): string => {
    return activity[field] ?? '';
  };

  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Activities</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="activities-container">
        {items.length === 0 ? (
          <div className="alert alert-info mb-3">No activities added yet. Click "Add an Activity" to get started!</div>
        ) : (
          items.map((activity, index) => (
            <div
              key={index}
              className="activity-card p-3 mb-3 border border-light rounded-3"
              style={{
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                borderLeft: '4px solid #0dcaf0'
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-secondary">
                  <i className="bi bi-calendar-heart text-info me-2"></i>Activity #{index + 1}
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
                  title="Remove activity"
                >
                  ✕
                </Button>
              </div>

              {/* Activity Details */}
              <div className="mb-3 p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Details
                </h6>
                <Row>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Activity Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="University of Michigan Museum of Art"
                        value={getFieldValue(activity, 'name')}
                        onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="525 S State St, Ann Arbor, MI 48109"
                        value={getFieldValue(activity, 'location')}
                        onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small fw-semibold">Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={getFieldValue(activity, 'date')}
                        onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}>
                    <Form.Group className="mb-0">
                      <Form.Label className="small fw-semibold">Time</Form.Label>
                      <Form.Control
                        type="time"
                        value={getFieldValue(activity, 'time')}
                        onChange={(e) => handleUpdate(index, 'time', e.target.value)}
                        disabled={loading}
                        className="border-light shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Notes Section */}
              <div className="p-3 bg-light rounded-2">
                <h6 className="fw-semibold text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                  Notes
                </h6>
                <Form.Group className="mb-0">
                  <Form.Label className="small fw-semibold">Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Don't forget to check out the cafe! It closes at 5pm"
                    rows={3}
                    value={getFieldValue(activity, 'notes')}
                    onChange={(e) => handleUpdate(index, 'notes', e.target.value)}
                    disabled={loading}
                    className="border-light shadow-sm"
                    style={{
                      resize: 'vertical',
                      transition: 'all 0.3s ease'
                    }}
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
          backgroundColor: '#0dcaf0',
          border: 'none',
          color: '#000'
        }}
      >
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Adding Activity...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i>Add an Activity
          </>
        )}
      </Button>
    </div>
  );
};
