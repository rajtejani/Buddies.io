import React from 'react';
import PageWrapper from './Components/PageWrapper';
import Home from './Containers/Home';

function App() {
  return (
    <div className="App">
      <PageWrapper>
        <Home />
      </PageWrapper>
    </div>
  );
}

export default App;
