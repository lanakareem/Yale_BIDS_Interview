// THIS FILE IS RESPONSIBLE FOR RENDERING SEARCH RESULTS RETRIEVED FROM THE BACKEND
// Display detailed info about each publication and link to the original PubMed entry

import React from 'react';

const Results = ({ results }) => (
  <div>
    {results?.length === 0 ? (
      <p>No results found.</p>
    ) : (
      <ul>
        {results.map(result => (
          <li key={result.PMID}>
            <h3>{result.Title || 'No title available.'}</h3>
            <p>{result.Abstract || 'No abstract available.'}</p>
            <p>Authors: {result.AuthorList.length > 0 ? result.AuthorList.join(', ') : 'No authors listed.'}</p>
            <p>Journal: {result.Journal || 'No journal information.'}</p>
            <p>Year: {result.PublicationYear || 'No publication year.'}</p>
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${result.PMID}`} target="_blank" rel="noopener noreferrer">
              View on PubMed
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Results;
