import React, {Component} from "react";
class Dashboard extends Component {

  render() {
    console.log(this.props.match.params.markets)
    return (
      <p>test</p>
    );
  }
}
export default Dashboard;
