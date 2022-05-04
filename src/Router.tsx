import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Questions = lazy(() => import('./views/Questions'));
const AddQuestion = lazy(() => import('./views/AddQuestion'));

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Questions />} />
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/edit-question/:id" element={<AddQuestion />} />
    </Routes>
  );
}
