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
    passwordConfirmation: "",
    errors: [],
    loading: false
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      // throw error
      error = { message: "Fill in all fields" };
      this.setState({
        errors: errors.concat(error)
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      // throw error
      error = { message: "Password is not valid" };
      this.setState({
        errors: errors.concat(error)
      });
      return false;
    } else {
      // if password and form is not empty
      return true;
    }
  };

  // Check if the length of the state properties are not '0'
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  // Check if the password is valid
  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation < 6) {
      // throw error
      return false;
    } else if (password !== passwordConfirmation) {
      // throw error
      return false;
    } else {
      return true;
    }
  };

  // Display the errors in UI
  displayErrors = errors => errors.map((e, i) => <p key={i}>{e.message}</p>);
  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          this.setState({ loading: false });
        }) //Chain a then method as this event is asynchronous
        .catch(err => {
          console.error(err);
          this.setState({
            errors: [...this.state.errors, err],
            loading: false
          });
        });
    }
  };

  // Check if the error is related to email, username or password mismatch

  handleInputErrors = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };
  render() {
    // Destructure state properties and pass them as values to make the form a controlled component
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
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
                className={this.handleInputErrors(errors, "email")}
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
                className={this.handleInputErrors(errors, "password")}
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
                className={this.handleInputErrors(errors, "password")}
              />
              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
            <Message>
              Already a user?&nbsp;
              <Link to="/login">Login</Link>
            </Message>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
