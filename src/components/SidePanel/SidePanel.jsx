import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        fixed="left"
        vertical
        inverted
        style={{ background: "#4F82CE", fontSize: "1rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} />
        <DirectMessages currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
