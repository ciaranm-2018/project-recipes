import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RecipeReviewCard from '../components/RecipeReviewCard';
import FormDialog from '../components/FormDialog';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loader from '../components/Loader';
import NotificationBar from '../components/NotificationBar';

//
import axios from 'axios';

const styles = {
  root: {
    width: '100%',
    flexGrow: 1,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

class Gallery extends Component {
  state = {
    addNewRecipeOpen: false,
    galleryLoading: true,
    recipes: [
      {recipeName: 'name 1', description: 'description 1'},
      {recipeName: 'name 2', description: 'description 2'},
      {recipeName: 'name 3', description: 'description 3'},
    ],
    error: {},
    data: {},
    notifcation : {messages:[],variant:'success', showMessages:false}
  };

  handleChange = name => event => {
    this.setState ({data: {...this.state.data, [name]: event.target.value}});
  };

  validator = data => {
    console.log ('validator', data);
    let isValidData = true;
    const error = {};
    for (let property in data) {
      if (data.hasOwnProperty (property)) {
        if (!data[property]) {
          error[property] = true;
          isValidData = false;
        }
      }
    }
    this.setState ({error});
    return isValidData;
  };

  hidenotification = () => {
    this.setState({notifcation:{showMessages:false}})
  }

  handleSave = () => {
    if (this.validator (this.state.data)) {
      this.setState ({galleryLoading: true, notifcation:{showMessages:false}});
      axios
        .post (
          'http://localhost:5000/api/recepies',
          this.state.data
        )
        .then (response => {
          console.log (response);
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            data: {},
            notifcation : {messages:["Your recipe has been successfully submitted."],variant:'success', showMessages:true}
          });
          setTimeout(this.hidenotification, 5000)
          
        })
        .catch (error => {
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            notifcation : {messages:["something went wrong please try again"],variant:'error', showMessages:true}
          });
          console.log (error);
          setTimeout(this.hidenotification, 5000)
        })
    }
  };

  handleClose = () => {
    this.setState ({addNewRecipeOpen: false, data: {}, error: {}});
  };

  handleOpen = () => {
    this.setState ({
      addNewRecipeOpen: true,
      data: {
        calories: null,
        cookTime: null,
        description: null,
        fat: null,
        ingredients: null,
        instructions: null,
        prepTime: null,
        recipeName: null,
        totalTime: null,
        yield: null,
      },
    });
  };

  componentDidMount () {
    axios
      .get ('http://localhost:5000/api/recepies')
      .then (response => {
        console.log (response.data);
        this.setState ({recipes: response.data, galleryLoading: false});
      })
      .catch (error => {
        console.log (error);
      });
  }

  render () {
    const {classes} = this.props;
    return (
      <div>
        <NotificationBar variant={this.state.notifcation.variant} messages = {this.state.notifcation.messages} showMessages ={this.state.notifcation.showMessages} />
        <Loader open={this.state.galleryLoading} />
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Tooltip title="Add new recipe" aria-label="Add new recipe">
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.handleOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>

        <Grid container spacing={24}>
          {this.state.recipes.map ((recipe, index) => (
            <RecipeReviewCard
              key={index}
              recipeName={recipe.recipeName}
              summary={recipe.description}
            />
          ))}
        </Grid>

        <FormDialog
          open={this.state.addNewRecipeOpen}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleClose={this.handleClose}
          error={this.state.error}
        />

      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (Gallery);
