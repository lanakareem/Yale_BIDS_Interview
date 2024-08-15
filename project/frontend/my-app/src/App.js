import React, { useState } from 'react';
import SearchForm from './components/searchForm';
import PublicationDetails from './components/publicationDetails';
import Pagination from './components/pagination';
import Results from './components/results';
import './App.css';

function App() {
  //State variables
  const [publicationIds, setPublicationIds] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //Handling Search Queries
  const handleSearch = async (query) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/publications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log('Publication IDs:', data.ids);
      setPublicationIds(data.ids);

      //Fetch detailed results for the first page:
      fetchResults(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Fetching results for a specific page
  const fetchResults = async (page) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/publications/details?ids=${publicationIds.join(',')}&page=${page}`);
      const data = await response.json();
      setResults(data.results);
      setCurrentPage(page);
      setTotalPages(data.totalPages); // Ensure your backend returns totalPages
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  //handling pagination changes
  const handlePageChange = (page) => {
    fetchResults(page);
  };

  //detches details of a selected publication
  const handleResultClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/publications/details?ids=${id}`);
      const data = await response.json();
      setSelectedPublication(data);
    } catch (error) {
      console.error('Error fetching publication details:', error);
    }
  };

  //render method
  return (
    <div className="App">
      <header className="App-header">
        <h1>Publication Search</h1>
        <SearchForm onSearch={handleSearch} />
        {results.length > 0 && (
        <>
          <Results results={results} onResultClick={handleResultClick} />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange} 
          />
        </>
      )}
      {selectedPublication && <PublicationDetails details={selectedPublication} />}
      </header>
    </div>
  );
}

export default App;
