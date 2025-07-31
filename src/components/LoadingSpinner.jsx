import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="flex items-center space-x-2">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <span className="text-gray-600">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;