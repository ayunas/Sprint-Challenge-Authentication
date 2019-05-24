import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Jokes from './Jokes';
import Login from './Login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Authenticator <br />v3</h2>
      </header>
      <main>
        <Route path='/login' render={(props) => { return <Login /> }} />
        <Route exact path='/' component={Jokes} />
        {/* <Login/>
          <Jokes/> */}
      </main>
    </div>
  );
}

export default App;
