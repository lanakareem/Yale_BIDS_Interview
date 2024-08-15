// THIS FILE DEFINES THE FORM FOR USER INPUT AND SEARCH SUBMISSION


import React, { useState } from 'react';

function searchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default searchForm;
