import React, { useState } from 'react';
import {
  makeStyles,
  createStyles,
  Tab,
  useMediaQuery,
  useTheme,
  Tabs,
  Divider
} from "@material-ui/core";
import { useNoteForm } from "hooks";
import {
  NoteForm,
  MainPanel,
  ConfirmDeleteModal,
  RenderedNote
} from "components";
import { useSwipeable } from "react-swipeable";
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    tabs: {
      width: '100%',
      height: 48,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      [theme.breakpoints.up('md')]: {
        boxShadow: 'none',
        backgroundColor: theme.palette.background.default
      },
      [theme.breakpoints.up('lg')]: {
        display: 'none'
      },
      "& hr": {
        margin: '0 auto',
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '80%'
        },
      }
    },
    content: {
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  })
)

export const Form: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const expanded = useMediaQuery(theme.breakpoints.up('lg'));
  const { slug } = useParams();
  const { onDelete, savedValue, ...formState } = useNoteForm(slug)
  const [tab, setTab] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false)

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => setTab(0),
    onSwipedRight: () => setTab(1)
  })

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs value={tab} onChange={(el, val) => setTab(val)} centered>
          <Tab label='write' />
          <Tab label="preview" />
        </Tabs>
        <Divider />
      </div>
      <div
        className={classes.content}
        data-testid='form-container'
        {...swipeHandler}
      >
        {(expanded || tab === 0) && (
          <MainPanel>
            <NoteForm
              onDelete={() => setDeleteOpen(true)}
              showDelete={Boolean(savedValue?.id)}
              {...formState}
            />
          </MainPanel>
        )}
        {(expanded || tab === 1) && (
          <MainPanel>
            <RenderedNote note={savedValue} />
          </MainPanel>
        )}
      </div>
      <ConfirmDeleteModal
        open={deleteOpen}
        title={`Permanently delete ${savedValue?.title}?`}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => onDelete()}
      />
    </div>
  )
}