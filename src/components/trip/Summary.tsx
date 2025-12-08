
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Trip Summary</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="formGroupName" className="font-semibold">Trip Name</Label>
          <Input
            id="formGroupName"
            type="text"
            placeholder="Enter trip name (e.g., Summer Vacation 2024)"
            value={name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            disabled={loading}
            className={error ? 'border-red-500' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="formGroupLocation" className="font-semibold">Location</Label>
          <Input
            id="formGroupLocation"
            type="text"
            placeholder="Enter trip location (e.g., Tokyo, Japan)"
            value={location}
            onChange={(e) => handleUpdate('location', e.target.value)}
            disabled={loading}
            className={error ? 'border-red-500' : ''}
          />
        </div>
      </div>
    </div>
  );
};
