
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
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
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Packing Checklist</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="checklist-container">
        {items.length === 0 ? (
          <div className="mb-3 rounded border border-blue-400 bg-blue-50 px-4 py-3 text-blue-700">
            No items in your checklist. Click "+" to add packing items!
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all duration-300"
              style={{
                backgroundColor: isChecked(item) ? '#e8f5e9' : '#f8f9fa',
                opacity: isChecked(item) ? 0.7 : 1
              }}
            >
              <div className="flex flex-grow items-center gap-3">
                <Button
                  variant={isChecked(item) ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => handleUpdate(index, 'checked', !isChecked(item))}
                  disabled={loading}
                  className={`h-10 w-10 min-h-10 min-w-10 rounded-full transition-all ${isChecked(item) ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-600 hover:bg-green-50'
                    }`}
                  title={isChecked(item) ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isChecked(item) ? '✓' : '○'}
                </Button>

                <div className="flex-grow">
                  <Input
                    type="text"
                    placeholder="Enter packing item (e.g., Passport)"
                    value={getFieldValue(item, 'name')}
                    onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                    disabled={loading}
                    className={isChecked(item) ? 'line-through bg-gray-100' : ''}
                  />
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemove(index)}
                disabled={loading}
                className="ml-2 h-9 w-9 min-h-9 min-w-9 rounded-full border-red-500 text-red-500 hover:bg-red-50"
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
        <div className="mt-3 rounded-md bg-gray-100 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              <strong>{items.filter((i) => isChecked(i)).length}</strong> of <strong>{items.length}</strong> items packed
            </span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-300">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${(items.filter((i) => isChecked(i)).length / items.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleAdd}
        disabled={loading}
        size="icon"
        className="mt-3 h-12 w-12 rounded-full text-2xl"
        title="Add new packing item"
      >
        {loading ? (
          <Spinner className="h-4 w-4" />
        ) : (
          '+'
        )}
      </Button>
    </div>
  );
};
