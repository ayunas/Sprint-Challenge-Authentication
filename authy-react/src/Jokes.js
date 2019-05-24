import React, { Component } from 'react'
import axios from 'axios';

class Jokes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jokes: []
        }
    }

    componentDidMount() {

        axios.get(`${this.props.url}/jokes`, { headers: { Authorization: this.props.jwt } })
            .then(res => {
                console.log("response", res.data);
                this.setState({
                    jokes: res.data
                })
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    render() {
        return (
            <>
                <button onClick={this.props.logout}>Logout</button>
                <ul>
                    {this.state.jokes.map(joke => <li>{joke.joke}</li>)}
                </ul>
            </>
        )
    }
}

export default Jokes;