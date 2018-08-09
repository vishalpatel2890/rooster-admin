import React, {Component} from "react";

import ProductList from './ProductList';
import DashboardNav from './DashboardNav';
import AddVendorMarketsModal from './AddVendorMarketsModal';

import '../Navigation.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="Vendors-page">
        <div className="Vendors-page-left">
          <DashboardNav />
          <AddVendorMarketsModal vendorUid={this.props.match.params.vendor}/>
        </div>
        <div className="Vendors-page-right">
          <div className="dashboard-product-list">
          <ProductList vendorUid={this.props.match.params.vendor} />
        </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
