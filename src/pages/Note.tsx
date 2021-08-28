import React from 'react';
import {
  makeStyles,
  createStyles,
  Typography
} from "@material-ui/core";
import {
  RenderedNote,
  MainPanel,
  CreateNoteFAB
} from "components";
import { useParams } from "react-router";
import { UseNote } from 'hooks';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      "& h4": {
        textAlign: 'center'
      }
    }
  })
)

export const Note: React.FC = () => {
  const classes = useStyles();
  const { slug } = useParams<{ slug: string }>();
  const { note, loading } = UseNote(slug ?? '')

  return (
    <MainPanel>
      {note ?
        (
          <RenderedNote note={note} />
        ) : !loading ? (
          <div className={classes.content}>
            <Typography variant='h4' color='textSecondary'>
              Not found
            </Typography>
          </div>
        ) : (
          ""
        )
      }
      <CreateNoteFAB />
    </MainPanel>
  )
}