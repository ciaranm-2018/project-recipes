import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function FormDialog (props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Recipe</DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
              error= {props.error.recipeName}
                autoFocus
                margin="dense"
                variant="outlined"
                id="name"
                label="Recipe Name"
                type="text"
                fullWidth
                onChange={props.handleChange ('recipeName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error= {props.error.description}
                margin="dense"
                id="name"
                variant="outlined"
                label="Description"
                type="text"
                fullWidth
                onChange={props.handleChange ('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error= {props.error.ingredients}
                margin="dense"
                variant="outlined"
                id="name"
                label="Ingredients (comma separated)"
                type="text"
                fullWidth
                onChange={props.handleChange ('ingredients')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error= {props.error.instructions}
                multiline
                rowsMax="4"
                margin="dense"
                variant="outlined"
                id="name"
                label="Instructions"
                type="text"
                fullWidth
                onChange={props.handleChange ('instructions')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
              error= {props.error.prepTime}
                margin="dense"
                variant="outlined"
                id="name"
                label="Prep Time (Minutes)"
                type="text"
                onChange={props.handleChange ('prepTime')}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
              error= {props.error.cookTime}
                margin="dense"
                variant="outlined"
                id="name"
                label="Cook Time (HH:MM)"
                type="text"
                onChange={props.handleChange ('cookTime')}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
              error= {props.error.totalTime}
                margin="dense"
                variant="outlined"
                id="name"
                label="Total Time (HH:MM)"
                type="text"
                onChange={props.handleChange ('totalTime')}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              error= {props.error.yield}
                margin="dense"
                variant="outlined"
                id="name"
                label="Yield (Servings)"
                type="text"
                fullWidth
                onChange={props.handleChange ('yield')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error= {props.error.calories}
                margin="dense"
                variant="outlined"
                id="name"
                label="Calories"
                type="text"
                fullWidth
                onChange={props.handleChange ('calories')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error= {props.error.fat}
                margin="dense"
                variant="outlined"
                id="name"
                label="Fat"
                type="text"
                fullWidth
                onChange={props.handleChange ('fat')}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={props.handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
