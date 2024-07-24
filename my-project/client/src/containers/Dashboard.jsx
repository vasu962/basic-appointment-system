// Dashboard.js

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </header>
      <main className="flex-1 p-6">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Welcome to My dashboard!</h2>
          <p className="text-gray-600">This is a sample dashboard component.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;