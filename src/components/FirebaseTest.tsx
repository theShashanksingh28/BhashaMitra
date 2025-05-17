import { useEffect, useState } from 'react';
import { testFirebaseConnection } from '../lib/firebase';

export default function FirebaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await testFirebaseConnection();
        setConnectionStatus(isConnected ? 'success' : 'error');
        if (!isConnected) {
          setErrorMessage('Failed to connect to Firebase. Please check your configuration.');
        }
      } catch (error) {
        setConnectionStatus('error');
        if (error instanceof Error) {
          setErrorMessage(`Error: ${error.message}`);
        } else {
          setErrorMessage('An unknown error occurred');
        }
        console.error('Firebase test error:', error);
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Firebase Connection Test</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            connectionStatus === 'checking' ? 'bg-yellow-500' :
            connectionStatus === 'success' ? 'bg-green-500' :
            'bg-red-500'
          }`} />
          <span className="font-medium">
            {connectionStatus === 'checking' ? 'Checking connection...' :
             connectionStatus === 'success' ? 'Connected to Firebase' :
             'Connection failed'}
          </span>
        </div>
        {errorMessage && (
          <div className="mt-2">
            <p className="text-red-500 text-sm">{errorMessage}</p>
            <p className="text-sm text-gray-600 mt-1">
              Please check:
              <ul className="list-disc list-inside mt-1">
                <li>Your Firebase configuration in .env file</li>
                <li>Firebase project settings</li>
                <li>Firebase service status</li>
              </ul>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 