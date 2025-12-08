
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
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
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Activities</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="activities-container">
        {items.length === 0 ? (
          <div className="mb-3 rounded border border-blue-400 bg-blue-50 px-4 py-3 text-blue-700">
            No activities added yet. Click "Add an Activity" to get started!
          </div>
        ) : (
          items.map((activity, index) => (
            <div
              key={index}
              className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300"
              style={{ borderLeft: '4px solid #0dcaf0' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="m-0 text-lg text-gray-600">
                  <i className="bi bi-calendar-heart text-cyan-500 mr-2"></i>Activity #{index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  className="h-9 w-9 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                  title="Remove activity"
                >
                  ✕
                </Button>
              </div>

              {/* Activity Details */}
              <div className="mb-3 rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Details
                </h6>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <Label className="text-xs font-semibold">Activity Name</Label>
                    <Input
                      type="text"
                      placeholder="University of Michigan Museum of Art"
                      value={getFieldValue(activity, 'name')}
                      onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Location</Label>
                    <Input
                      type="text"
                      placeholder="525 S State St, Ann Arbor, MI 48109"
                      value={getFieldValue(activity, 'location')}
                      onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(activity, 'date')}
                      onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      type="time"
                      value={getFieldValue(activity, 'time')}
                      onChange={(e) => handleUpdate(index, 'time', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Notes
                </h6>
                <div>
                  <Label className="text-xs font-semibold">Additional Notes</Label>
                  <textarea
                    placeholder="Don't forget to check out the cafe! It closes at 5pm"
                    rows={3}
                    value={getFieldValue(activity, 'notes')}
                    onChange={(e) => handleUpdate(index, 'notes', e.target.value)}
                    disabled={loading}
                    className="mt-1 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 bg-cyan-500 text-black hover:bg-cyan-600"
      >
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Adding Activity...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle mr-2"></i>Add an Activity
          </>
        )}
      </Button>
    </div>
  );
};
