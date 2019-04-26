import React, { Component } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import firebase from "../../firebase";

class Messages extends Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    messages: [],
    messageLoading: true,
    numUniqueUsers: ""
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    const { channel, user } = this.state;
    if (channel && user) {
      this.addMessageListener(channel.id);
    }
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    const { messagesRef } = this.state;
    messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messageLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const numUniqueUsers = `${uniqueUsers.length} ${this.displayPlural(
      uniqueUsers
    )}`;
    this.setState({ numUniqueUsers });
  };

  displayPlural = users => {
    return users.length <= 1 ? "User" : "Users";
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  displayChannelName = channel => (channel ? `#${channel.name}` : "");
  render() {
    const { messagesRef, channel, messages, user, numUniqueUsers } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader
          numUniqueUsers={numUniqueUsers}
          channelName={this.displayChannelName(channel)}
        />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          currentUser={user}
          currentChannel={channel}
          messagesRef={messagesRef}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
