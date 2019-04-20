import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        console.log(createdUser);
      }) //Chain a then method as this event is asynchronous
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    // Destructure state properties and pass them as values to make the form a controlled component
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for SlackDevChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                autoComplete="true"
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                type="text"
                value={username}
              />
              <Form.Input
                fluid
                autoComplete="true"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                onChange={this.handleChange}
                type="email"
                value={email}
              />
              <Form.Input
                fluid
                autoComplete="true"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
              <Form.Input
                fluid
                autoComplete="true"
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />
              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
            <Message>
              Already a user?&nbsp;
              <Link to="/login">Login</Link>
            </Message>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
