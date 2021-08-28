import React from 'react';
import {
  Button,
  InputAdornment,
  makeStyles,
  createStyles,
  OutlinedTextFieldProps
} from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import SavedIcon from "@material-ui/icons/Check";
import UnSavedIcon from "@material-ui/icons/DeleteForever";
import { userNoteFields } from 'db';
import { NoteTextField } from './NoteTextField';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    },
    textarea: {
      height: 'calc(100vh - 400px)',
      [theme.breakpoints.up('lg')]: {
        height: 'calc(100vh - 350px)',
      }
    },
    progress: {
      position: 'absolute',
      top: 0
    },
    delete: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main,
      width: 20
    },
    "@keyframes spin": {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      },
    },
    savedIcon: {
      color: green[500]
    },
    unsavedIcon: {
      color: yellow[200]
    }
  })
)

interface Props extends Omit<Partial<OutlinedTextFieldProps>, 'value'> {
  values: userNoteFields,
  saved?: boolean,
  showDelete?: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  errors: {
    [k in keyof userNoteFields]?: string | null
  }
}

export const NoteForm: React.FC<Props> = ({
  values,
  errors,
  showDelete = false,
  onDelete,
  saved,
  ...rest
}) => {

  const classes = useStyles();

  const LoadingAdornment: React.FC = () => (
    <InputAdornment position='end'>
      <UnSavedIcon classes={{ root: classes.unsavedIcon }} />
    </InputAdornment>
  )

  const SavedAdornment: React.FC = () => (
    <InputAdornment position='end'>
      <SavedIcon classes={{ root: classes.savedIcon }} />
    </InputAdornment>
  )

  const Adorn =
    saved === undefined ? undefined : saved ?
      (
        <SavedAdornment />
      ) : (
        <LoadingAdornment />
      )

  return (
    <div className={classes.root}>
      <NoteTextField
        name='title'
        label='Title'
        value={values.title}
        error={!!errors.title}
        helperText={!!errors.title}
        inputProps={{ endAdornment: Adorn }}
        {...rest}
      />
      <NoteTextField
        name='md'
        label='Note'
        multiline
        rows='20'
        value={values.md}
        error={!!errors.md}
        helperText={!!errors.md ?? "Support github flavoured markdown"}
        inputProps={{
          classes: {
            input: classes.textarea
          }
        }}
        {...rest}
      />
      <NoteTextField
        name='tags'
        label='Tags'
        value={values.tags.join(' ')}
        error={!!errors.tags}
        helperText={!!errors.md ?? "Separated by spaces"}
        {...rest}
      />
      {showDelete && (
        <Button
          onClick={onDelete}
          variant="outlined"
          fullWidth={false}
          size='small'
          classes={{ root: classes.delete }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </div>
  )

}
