import React from "react";
import { makeStyles, createStyles, Fab, useMediaQuery, useTheme } from "@material-ui/core";
import { Link } from "react-router-dom";
import Icon from '@material-ui/icons/NoteAdd'

const useStyles = makeStyles((theme)  => 
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
      '& svg': {
        marginRight: theme.spacing()
      },
      [theme.breakpoints.down('sm')]: {
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        '& svg': {
          marginRight:0
        }
      }
  }
  })
)

export const CreateNoteFAB: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const collapse = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fab
      variant={collapse ? 'circular' : 'extended'}
      classes={{ root: classes.root }}
      color='primary'
      component={Link}
      to='/create'
      size='large'
    >
      <Icon />
      {!collapse && 'New Note'}
    </Fab>
  )
}