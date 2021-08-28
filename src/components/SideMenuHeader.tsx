import React from 'react';
import {
  createStyles,
  makeStyles,
  IconButton,
  Typography,
  Hidden,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import GithubIcon from '@material-ui/icons/GitHub'
import CloseIcon from '@material-ui/icons/Close'
import OpenIcon from '@material-ui/icons/Menu'
import LightModeIcon from '@material-ui/icons/Brightness7'
import DarkModeIcon from '@material-ui/icons/Brightness5'
import CreateNoteIcon from '@material-ui/icons/NoteAdd'
import { useThemeContext } from "hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: theme.spacing(2),
      flexDirection: expanded => expanded ? "row" : "column-reverse",
    },
    header: {
      marginRight: "auto",
      "& h6": {
        fontFamily: "'McLaren', cursive;",
      },
      "& h5": {
        fontFamily: "'McLaren', cursive;",
      },
    },
  })
)


interface props {
  onClose(): void,
  onOpen(): void,
  expanded: boolean
}

export const SideMenuHeader: React.FC<props> = ({ onClose, onOpen, expanded }) => {
  const classes = useStyles(expanded);
  const { paletteType, togglePalette } = useThemeContext()

  return (
    <div className={classes.root}>
      {!expanded && (
        <Hidden smDown>
          <IconButton component={Link} to='/create'>
            <CreateNoteIcon />
          </IconButton>
        </Hidden>
      )}
      {expanded && (
        <div className={classes.header}>
          <Typography variant="h5">
            Simple-Pad
            <small>
              <em>s</em>
            </small>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Offline note taking
          </Typography>
        </div>
      )}
      <IconButton href="https://github.com/Emmynash/simple-pad">
        <GithubIcon />
      </IconButton>
      <IconButton onClick={(() => togglePalette())}>
        {
          paletteType === 'dark' ?
            (
              <DarkModeIcon titleAccess="Dark theme mode" />
            ) : (
              <LightModeIcon titleAccess="Light theme mode" />
            )
        }
      </IconButton>
      {!expanded ?
        (
          <IconButton onClick={() => onOpen()}>
            <OpenIcon titleAccess="menu open" />
          </IconButton>
        ) : (
          <IconButton onClick={() => onClose()}>
            <CloseIcon titleAccess="menu close" />
          </IconButton>
        )
      }
    </div>
  )
}