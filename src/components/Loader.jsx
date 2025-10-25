// src/components/Loader.jsx
import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-dua-accent"></div> {/* Spinner using accent color */}
    </div>
  );
}

export default Loader;