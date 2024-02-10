import React from 'react';

function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>The page you requested could not be found.</p>
      <p>
        {/* Optionally, add a link to the home page or other relevant routes */}
        <a href="/">Go back to Home</a>
      </p>
    </div>
  );
}

export default ErrorPage;