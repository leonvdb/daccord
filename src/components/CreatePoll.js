import React, { Component } from 'react'

class CreatePoll extends Component {
    state = {
        title: '',
        email: ''
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        //TODO: Implement Submit with API requests, etc..
        console.log(this.state);
    }

    render() {
        const { title, email } = this.state;
        return (
            <div>
                <h2>Creating a new poll</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={this.onChange}
                        />
                    </div>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    };
};

export default CreatePoll;