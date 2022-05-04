import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Router';

export default function App() {
  return (
    <React.Suspense fallback={<></>}>
      <Router>
        <Routing />
      </Router>
    </React.Suspense>
  );
}
