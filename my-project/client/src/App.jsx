// App.js

import Dashboard from './containers/Dashboard';

function App() {
  return (
    <div className="h-screen flex justify-center bg-gray-50">
      <div className="max-w-md w-full p-4 pt-6">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;