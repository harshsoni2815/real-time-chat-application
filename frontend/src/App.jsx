import React from 'react';
import { Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Page from './page/Page.jsx';
import Index from './page/index.jsx';
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path="/" component={Index} />
        <Route path="/home" component={Page} />
      </Router>
    </div>
  );
}

export default App;