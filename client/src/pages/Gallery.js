import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import RecipeReviewCard from '../components/RecipeReviewCard';
import FormDialog from '../components/FormDialog';
import ViewRecipeDialog from '../components/ViewRecipeDialog';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Loader from '../components/Loader';
import NotificationBar from '../components/NotificationBar';
import CustomizedInputBase from '../components/CustomizedInputBase';

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
    viewRecipeOpen: false,
    galleryLoading: true,
    recipes: [],
    error: {},
    data: {},
    notification: {messages: [], variant: 'success', showMessages: false},
    viewRecipeData: {},
  };

  handleChange = name => event => {
    this.setState ({data: {...this.state.data, [name]: event.target.value}});
  };

  validator = data => {
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
    this.setState ({notification: {showMessages: false}});
  };

  handleSave = () => {
    if (this.validator (this.state.data)) {
      this.setState ({
        galleryLoading: true,
        notification: {showMessages: false},
      });
      axios
        .post ('https://project-recipes-ciaranm.c9users.io:8081/api/recepies', this.state.data)
        .then (response => {
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            notification: {
              messages: ['Your recipe has been successfully submitted.'],
              variant: 'success',
              showMessages: true,
            },
          });
          this.getRecipes ();
          setTimeout (this.hidenotification, 5000);
        })
        .catch (error => {
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            notification: {
              messages: ['something went wrong please try again'],
              variant: 'error',
              showMessages: true,
            },
          });
          setTimeout (this.hidenotification, 5000);
        });
    } else {
      console.log ('invalid');
    }
  };

  handleUpdate = () => {
    if (this.validator (this.state.data)) {
      this.setState ({
        galleryLoading: true,
        notification: {showMessages: false},
      });
      axios
        .post ('https://project-recipes-ciaranm.c9users.io:8081/api/recepe/', this.state.data)
        .then (response => {
          console.log (response);
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            notification: {
              messages: ['Your recipe has been successfully updated.'],
              variant: 'success',
              showMessages: true,
            },
          });
          this.getRecipes ();
          setTimeout (this.hidenotification, 5000);
        })
        .catch (error => {
          this.setState ({
            addNewRecipeOpen: false,
            galleryLoading: false,
            notification: {
              messages: ['something went wrong please try again'],
              variant: 'error',
              showMessages: true,
            },
          });
          console.log (error);
          setTimeout (this.hidenotification, 5000);
        });
    } else {
      console.log ('invalid');
    }
  };

  handleClose = () => {
    this.setState ({
      addNewRecipeOpen: false,
      data: {
        calories: '',
        cookTime: '',
        description: '',
        fat: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        recipeName: '',
        totalTime: '',
        yield: '',
      },
      error: {},
    });
  };

  handleViewRecipeClose = () => {
    this.setState ({viewRecipeOpen: false, error: {}});
  };

  handleOpen = data => {
    this.setState ({
      addNewRecipeOpen: true,
      data: {
        calories: '',
        cookTime: '',
        description: '',
        fat: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        recipeName: '',
        totalTime: '',
        yield: '',
        ...data,
      },
    });
  };

  handleViewRecipeOpen = id => {
    // local update view count
    const clonedRecipes = JSON.parse (JSON.stringify (this.state.recipes));
    clonedRecipes.forEach (recipe => {
      if (recipe.id === id) {
        recipe.matrics.views += 1;
      }
    });

    this.setState ({galleryLoading: true});
    axios
      .get (`https://project-recipes-ciaranm.c9users.io:8081/api/recepe/${id}`)
      .then (response => {
        console.log (response.data);
        this.setState ({
          viewRecipeOpen: true,
          galleryLoading: false,
          viewRecipeData: response.data,
          recipes: clonedRecipes,
        });
      })
      .catch (error => {
        this.setState ({
          addNewRecipeOpen: false,
          galleryLoading: false,
          notification: {
            messages: ['something went wrong please try again'],
            variant: 'error',
            showMessages: true,
          },
        });
        console.log (error);
        setTimeout (this.hidenotification, 5000);
      });
  };

  handleDelete = id => {
    this.setState ({
      galleryLoading: true,
      notification: {showMessages: false},
    });
    axios
      .delete (`https://project-recipes-ciaranm.c9users.io:8081/api/recepe/${id}`)
      .then (response => {
        this.setState ({
          galleryLoading: false,
          notification: {
            messages: ['Successfully deleted.'],
            variant: 'success',
            showMessages: true,
          },
          viewRecipeOpen: false,
          error: {},
          viewRecipeData: {},
        });
        this.getRecipes ();
        setTimeout (this.hidenotification, 5000);
      })
      .catch (error => {
        console.log (error);
      });
  };
  handleChangeBasicSearch = data => {
    this.setState ({
      galleryLoading: true,
      notification: {showMessages: false},
    });

    if (!data) {
      data = '-';
    }

    axios
      .get (`https://project-recipes-ciaranm.c9users.io:8081/api/recepe/search/${data}`)
      .then (response => {
        if (response.data.length === 0) {
          this.setState ({
            recipes: [],
            galleryLoading: false,
            notification: {
              messages: ['No Matching Result'],
              variant: 'info',
              showMessages: true,
            },
          });
        }
        this.setState ({recipes: response.data, galleryLoading: false});
      })
      .catch (error => {
        console.log (error);
      });
  };

  getRecipes = () => {
    this.setState ({
      galleryLoading: true,
    });
    axios
      .get ('https://project-recipes-ciaranm.c9users.io:8081/api/recepies')
      .then (response => {
        console.log (response.data);
        this.setState ({recipes: response.data, galleryLoading: false});
      })
      .catch (error => {
        this.setState ({
          galleryLoading: false,
          notification: {
            messages: ['something went wrong please try again'],
            variant: 'error',
            showMessages: true,
          },
        });
        console.log (error);
        setTimeout (this.hidenotification, 5000);
      });
  };

  handleUpdateClick = data => {
    this.setState ({viewRecipeOpen: false}, () => this.handleOpen (data));
  };

  handleRecipeVote = (data, id) => {
    console.log (data, id);
    // local update view count
    const clonedRecipes = JSON.parse (JSON.stringify (this.state.recipes));
    clonedRecipes.forEach (recipe => {
      if (recipe.id === id) {
        if (data == 'upVotes') {
          recipe.matrics.upVotes += 1;
        } else {
          recipe.matrics.downVotes += 1;
        }
      }
    });
    this.setState ({recipes:clonedRecipes });

    axios
    .post ('https://project-recipes-ciaranm.c9users.io:8081/api/recepe/vote', {id,action:data})
    .then (response => {
      console.log (response.data);
    })
    .catch (error => {
      console.log (error);
    });
  };

  handleReset = () => {
    this.setState ({notification: {showMessages: false}});
    this.getRecipes ();
  };

  componentDidMount () {
    this.getRecipes ();
  }

  render () {
    const {classes} = this.props;
    return (
      <div>

        <Loader open={this.state.galleryLoading} />
        <Grid
          style={{paddingBottom: 10}}
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >

          <CustomizedInputBase
            handleChangeBasicSearch={this.handleChangeBasicSearch}
            handleReset={this.handleReset}
          />
          <Tooltip
            style={{marginLeft: 20}}
            title="Add new recipe"
            aria-label="Add new recipe"
          >
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={() => this.handleOpen ()}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

        </Grid>

        <NotificationBar
          variant={this.state.notification.variant}
          messages={this.state.notification.messages}
          showMessages={this.state.notification.showMessages}
        />

        <Grid container spacing={24} style={{marginTop: 10}}>

          {this.state.recipes.map ((recipe, index) => (
            <RecipeReviewCard
              key={index}
              recipeName={recipe.recipeName}
              summary={recipe.description}
              {...recipe}
              handleViewRecipeOpen={() => this.handleViewRecipeOpen (recipe.id)}
            />
          ))}
        </Grid>

        <FormDialog
          open={this.state.addNewRecipeOpen}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleUpdate={this.handleUpdate}
          handleClose={this.handleClose}
          error={this.state.error}
          data={this.state.data}
        />
        <ViewRecipeDialog
          open={this.state.viewRecipeOpen}
          handleClose={this.handleViewRecipeClose}
          data={this.state.viewRecipeData}
          handleDelete={id => this.handleDelete (id)}
          handleUpdateClick={() =>
            this.handleUpdateClick (this.state.viewRecipeData)}
          handleRecipeVote={(data, id) => this.handleRecipeVote (data, id)}
        />

      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles (styles) (Gallery);
