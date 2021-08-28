import React from 'react';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit'
import { Note } from 'db';
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemAvatar,
  createStyles,
  makeStyles,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 3px',
      transform: 'scale(0.8)'
    }
  })
)

interface props {
  notes: Note[]
}

export const NoteList: React.FC<props> = ({ notes }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>

  return (
    <List>
      {
        notes.filter(Boolean).map(
          (note) => (
            <ListItem key={note.slug} button component={Link} to={`/${note.slug}`}>
              <ListItemAvatar>
                <Avatar>{note.title.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={note.title}
                primaryTypographyProps={{
                  noWrap: false
                }}
                secondary={
                  <span>
                    {moment(note.modified).fromNow}
                    {note.tags.length ? bull : ''}
                    {note.tags.join(", ")}
                  </span>
                }
              />
              <ListItemSecondaryAction>
                <IconButton component={Link} to={`/${note.slug}/edit`}>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
    </List>
  )
}