import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";
class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        fixed="left"
        vertical
        inverted
        style={{ background: "#4c3c4c", fontSize: "1rem" }}
      >
        <UserPanel currentUser={currentUser} />
      </Menu>
    );
  }
}

export default SidePanel;
