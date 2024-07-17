import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './components/Tasks/Tasks';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<PrivateRoute component={Tasks} />} />
          <Route path="/" element={<PrivateRoute component={Tasks} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
