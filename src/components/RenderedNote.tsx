import React, { useRef, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
import hljs from 'highlight.js';
import {
  makeStyles,
  createStyles,
  Chip,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Link,
  Checkbox,
} from '@material-ui/core';
import 'highlight.js/styles/atom-one-dark.css';
import { unSaveNoteField } from 'db';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: { marginBottom: theme.spacing(4) },
    content: {
      padding: theme.spacing(),
      marginTop: theme.spacing(5),
      paddingTop: 0,
      zIndex: -10,
      fontFamily: theme.typography.fontFamily,

      '& p': {
        ...theme.typography.body1,
        margin: `${theme.spacing()}px 0`,
        '& img': {
          maxWidth: '80%'
        }
      },
      '& ol, ul': {
        ...theme.typography.body1,
      },
      '& dl': {
        margin: theme.spacing(),
        '& dd': {
          fontWeight: 700,
          fontSize: '1.05rem'
        },
        '& dt': {
          marginLeft: 0
        }
      },
      '& blockquote': {
        padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        margin: theme.spacing()
      }
    },
    chip: {
      marginLeft: theme.spacing()
    },
    tags: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3)
    },
    wrapper: {
      margin: '0 auto 0 10px',
      maxWidth: 700
    }
  })
)

const options = {
  overrides: {
    tbody: TableBody,
    thead: TableHead,
    tr: TableRow,
    td: TableCell,
    th: TableCell,
    a: (props: any) => <Link color='secondary' {...props} />,
    table: (props: any) => (
      <TableContainer component={Paper}>
        <Table {...props} />
      </TableContainer>
    ),
    blockquote: (props: any) => <Paper component='blockquote' {...props} />,
    h1: (props: any) => (
      <Typography variant='h3' component='h1' gutterBottom {...props} />
    ),
    h2: (props: any) => (
      <Typography variant='h4' component='h2' gutterBottom {...props} />
    ),
    h3: (props: any) => (
      <Typography variant='h5' component='h3' gutterBottom {...props} />
    ),
    h4: (props: any) => (
      <Typography variant='h6' component='h4' gutterBottom {...props} />
    ),
    h5: (props: any) => (
      <Typography variant='body1' component='p' gutterBottom {...props} />
    ),
    h6: (props: any) => (
      <Typography variant='body1' component='p' gutterBottom {...props} />
    ),
    input: ({ type, ...rest }: { type: any }) => <Checkbox {...rest} />,
    // code: (props: any) =>
    // {
    //   useSwipeable({
    //     onSwiping: (e) => e.event.stopPropagation(), 
    //   })
    //   }
    // (
    //   <Swipeable
    //     onSwiping={(e: any) => {
    //       e.event.stopPropagation()
    //     }}>
    //     <code {...props} />
    //   </Swipeable>
    // )
  }
}
interface props {
  note: unSaveNoteField
}
export const RenderedNote: React.FC<props> = ({ note }) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el as HTMLElement));
  }, [note.md])

  return (
    <div className={classes.wrapper}>
      <Typography variant='h3' component='h1' classes={{ root: classes.title }}>
        {note.title}
      </Typography>
      <div ref={ref}>
        <Markdown className={classes.content} options={options}>
          {note.md}
        </Markdown>
      </div>
      <div className={classes.tags}>
        {note.tags.filter(Boolean).map(t => (
          <Chip key={t} label={t} variant='outlined' className={classes.chip} />
        ))}
      </div>
    </div>
  )
}