import { AlertCircle, XCircle } from 'lucide-react';

const AlertMessage = ({ type, message, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg ${
    type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
  }`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default AlertMessage;