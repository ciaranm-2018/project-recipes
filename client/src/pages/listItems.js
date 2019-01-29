import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export const renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;


class ListItemLink1 extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink1.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};


export const mainListItems = (
  <div>
  <ListItemLink1 to="/gallery" primary="Gallery" icon={<DashboardIcon/>} />
  <ListItemLink1 to="/category" primary="Category" icon={<BarChartIcon/>} />
  </div>
);