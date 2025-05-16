import React from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <Calendar />
      </main>
    </div>
  );
};

export default App;