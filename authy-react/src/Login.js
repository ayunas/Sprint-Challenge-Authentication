import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    input = (e) => {
        e.preventDefault();
        console.log('input triggered');
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <input name="username" placeholder="username" value={this.state.username} onChange={this.input} /> <br />
                <input name="password" placeholder="password" type="password" value={this.state.password} onChange={this.input} /> <br />
                <button onClick={() => this.props.login(this.state)}> Login</button>
                <button onClick={() => this.props.register(this.state)}> Register</button>
            </form >
        )
    }
}
