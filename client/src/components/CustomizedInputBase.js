import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';


const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginLeft: '40%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class SearchBar extends React.Component {
  state = {
    isAdvanceSearch: false,
    basicSearchValue: ""
  };
  render () {
    const {classes, handleChangeBasicSearch, handleReset} = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder="Search Recipes"
          onChange={e => this.setState({basicSearchValue: e.target.value})}
          value = {this.state.basicSearchValue}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={() => handleChangeBasicSearch (this.state.basicSearchValue)}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
        <Button
          color="primary"
          className={classes.button}
          onClick={() => {this.setState({basicSearchValue:''})
          handleReset()
          
          }}
        >
          Reset
        </Button>
        <Divider className={classes.divider} />
        <Button
          color="primary"
          className={classes.button}
          onClick={() => console.log ('advance')}
        >
          Advanced
        </Button>

      </Paper>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (SearchBar);
