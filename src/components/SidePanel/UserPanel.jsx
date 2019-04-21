import React, { Component } from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import firebase from "../../firebase";
import { connect } from "react-redux";

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  };

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed out");
      });
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    { key: "avatar", text: <span>Change Avatar</span> },
    { key: "signout", text: <span onClick={this.handleSignOut}>Sign out</span> }
  ];
  render() {
    const { displayName, photoURL } = this.state.user;
    return (
      <Grid style={{ background: "#4F82CE" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: "0" }}>
            {/* Main App Header */}
            <Header inverted as="h2" floated="left">
              <Icon name="code" style={{ fontSize: "1.5rem" }} />
              <Header.Content style={{ fontSize: "1.5rem" }}>
                SlackDevChat
              </Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={photoURL}
                    alt={displayName}
                    spaced="right"
                    avatar
                  />
                  {displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);
