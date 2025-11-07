import React from 'react';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { TripItem } from '../../types/index';

interface ChecklistProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string | boolean) => void;
  loading?: boolean;
  error?: string | null;
}

export const Checklist: React.FC<ChecklistProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (item: TripItem, field: string): string => {
    return item[field] ?? '';
  };

  const isChecked = (item: TripItem): boolean => {
    return item.checked === true;
  };

  return (
    <div className="card card-modern p-4 shadow-sm">
      <h2 className="mb-4 fw-bold text-primary">Packing Checklist</h2>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      <div className="checklist-container">
        {items.length === 0 ? (
          <div className="alert alert-info mb-3">No items in your checklist. Click "+" to add packing items!</div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="checklist-item p-3 mb-2 border border-light rounded-3 d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: isChecked(item) ? '#e8f5e9' : '#f8f9fa',
                transition: 'all 0.3s ease',
                opacity: isChecked(item) ? 0.7 : 1
              }}
            >
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                <Button
                  className="rounded-circle p-0"
                  variant={isChecked(item) ? 'success' : 'outline-success'}
                  onClick={() => handleUpdate(index, 'checked', !isChecked(item))}
                  disabled={loading}
                  style={{
                    width: '40px',
                    height: '40px',
                    transition: 'all 0.2s ease',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                  title={isChecked(item) ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isChecked(item) ? '✓' : '○'}
                </Button>

                <Form.Group className="mb-0 flex-grow-1">
                  <Form.Control
                    type="text"
                    placeholder="Enter packing item (e.g., Passport)"
                    value={getFieldValue(item, 'name')}
                    onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                    disabled={loading}
                    className="border-light shadow-sm"
                    style={{
                      textDecoration: isChecked(item) ? 'line-through' : 'none',
                      backgroundColor: isChecked(item) ? '#f5f5f5' : '#fff',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Form.Group>
              </div>

              <Button
                className="rounded-circle p-0"
                variant="outline-danger"
                onClick={() => handleRemove(index)}
                disabled={loading}
                style={{
                  width: '36px',
                  height: '36px',
                  transition: 'all 0.2s ease',
                  minWidth: '36px',
                  minHeight: '36px'
                }}
                title="Remove item"
              >
                ✕
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Checklist Stats */}
      {items.length > 0 && (
        <div className="mt-3 p-3 bg-light rounded-2">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted small">
              <strong>{items.filter((i) => isChecked(i)).length}</strong> of <strong>{items.length}</strong> items packed
            </span>
            <div
              style={{
                width: '100px',
                height: '8px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${(items.filter((i) => isChecked(i)).length / items.length) * 100}%`,
                  height: '100%',
                  backgroundColor: '#28a745',
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 rounded-circle p-0"
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          backgroundColor: '#0d6efd',
          border: 'none',
          fontSize: '24px',
          minWidth: '48px',
          minHeight: '48px'
        }}
        title="Add new packing item"
      >
        {loading ? (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
          '+'
        )}
      </Button>
    </div>
  );
};
