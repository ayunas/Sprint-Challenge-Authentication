import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Jokes from './Jokes';
import Login from './Login';
import axios from 'axios';
import { withRouter } from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      url: 'http://localhost:3300/api',
      jwt: ''
    }
  }

  componentDidMount() {




  }



  login = user => {
    console.log("%c login triggered!", "font-size:20px; color:blue;", user);
    const jwt = localStorage.getItem("jwt");
    this.setState({
      jwt: jwt
    })

    axios.post(`${this.state.url}/login`, user, { headers: { Authorization: jwt } })
      .then(res => {
        console.log('response', res);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  logout = () => {
    console.log("logout triggered");
    localStorage.removeItem("jwt");
    this.props.history.push("/login");
  }

  register = newUser => {
    console.log("%c register triggered!", "font-size:20px; color:red;", newUser);
    axios.post(`${this.state.url}/register`, newUser)
      .then(res => {
        console.log("response", res.data);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Authenticator <br />v3</h2>
        </header>
        <main>
          <Route path='/login' render={props => <Login login={this.login} register={this.register} />} />
          <Route exact path='/' render={props => <Jokes url={this.state.url} jwt={this.state.jwt} logout={this.logout} />} />
        </main>
      </div>
    )
  };
}

export default withRouter(App);
