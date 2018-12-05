import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../actions/pollActions';
import TextInputGroup from './layout/TextInputGroup';

class CreatePoll extends Component {
    state = {
        title: '',
        email: '',
        errors: {}
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();

        const { title, email } = this.state

        // Form validation
        const errors = {}
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if (!validEmail) {
            errors.email = 'Please enter a valid email address.'
        }

        if (!title.length > 0) {
            errors.title = 'Please enter a title'
        }

        if (Object.keys(errors).length > 0) {
            this.setState({
                errors
            })
            return;
        }

        const newPoll = {
            title,
            email
        };
        this.props.createPoll(newPoll).then(poll => {
            this.props.history.push(`/poll/${poll.ref_id}`)
        })

    }

    render() {
        const { title, email, errors } = this.state;
        return (
            <div>
                <h2>Creating a new poll</h2>
                <form onSubmit={this.onSubmit}>
                    <TextInputGroup
                        label="Title"
                        name="title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={this.onChange}
                        error={errors.title}

                    />
                    <TextInputGroup
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={this.onChange}
                        error={errors.email}

                    />
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    };
};

export default connect(null, { createPoll })(CreatePoll);