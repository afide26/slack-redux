import React, { Component } from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import uuidv4 from "uuid/v4";
import FileModal from "./FileModal";
import firebase from "../../firebase";

class MessageForm extends Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadState: "",
    percentUploaded: 0,
    uploadTask: null,
    message: "",
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });
  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = (fileUrl = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      }
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { channel, message } = this.state;

    // Check if there is a message
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.state.channel.id;
    const ref = this.props.messagesRef;
    const filePath = `chat/public/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded =
              Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
            this.setState({ percentUploaded });
          },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({
          uploadState: "done"
        }).catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err)
          });
        });
      });
  };
  render() {
    const { errors, message, loading, modal } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          value={message}
          className={
            errors.some(error => JSON.stringify(error).includes("message"))
              ? "error"
              : ""
          }
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            disabled={loading}
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
          />
          <Button
            style={{ color: "white", backgroundColor: "#4f82ce" }}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
            onClick={this.openModal}
          />
        </Button.Group>
        <FileModal
          uploadFile={this.uploadFile}
          modal={modal}
          closeModal={this.closeModal}
        />
      </Segment>
    );
  }
}

export default MessageForm;
