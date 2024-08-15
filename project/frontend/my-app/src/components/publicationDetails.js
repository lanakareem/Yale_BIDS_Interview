//THIS FILE WILL DISPLAY DETAILED INFO ABOUT A SPECIFIC PUBLICATION
//USED WHEN USERS CLICK TO VIEW MORE DETAILS ABOUT A PUBLICATION

import React from 'react';

const PublicationDetails = ({ details }) => (
  <div className="publication-details">
    {details ? (
      <div>
        <h2>{details.Title}</h2>
        <p><strong>Abstract:</strong> {details.Abstract || 'No abstract available.'}</p>
        <p><strong>Authors:</strong> {details.AuthorList.join(', ') || 'No authors listed.'}</p>
        <p><strong>Journal:</strong> {details.Journal || 'No journal information.'}</p>
        <p><strong>Publication Year:</strong> {details.PublicationYear || 'No publication year.'}</p>
        <a href={`https://pubmed.ncbi.nlm.nih.gov/${details.PMID}`} target="_blank" rel="noopener noreferrer">
          View on PubMed
        </a>
      </div>
    ) : (
      <p>No details available.</p>
    )}
  </div>
);

export default PublicationDetails;
