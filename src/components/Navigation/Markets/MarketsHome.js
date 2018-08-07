import React, {Component} from "react";

import MarketsList from "./MarketsList";
import MarketsHomeNav from "./MarketsHomeNav";
import AddMarketModal from "./AddMarketModal";

class MarketsHome extends Component {
  render() {
    return (
      <div className="Markets-page">
        <AddMarketModal />
        <div className="Markets-page-left">
          <MarketsHomeNav />
        </div>
        <div className="Markets-page-right">
          <MarketsList />
        </div>
      </div>
    );
  }
}

export default MarketsHome;
