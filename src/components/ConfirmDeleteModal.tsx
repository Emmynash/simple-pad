import React from 'react';
import {
  makeStyles,
  createStyles,
  Slide,
  SlideProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    delete: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  })
)

const Transition = React.forwardRef((props: SlideProps, ref: React.Ref<unknown> | undefined) => (
  <Slide direction="up" ref={ref} {...props} />
))

interface props {
  title: string,
  onClose(): void,
  onConfirm(): void,
  body?: string,
  open: boolean
}

export const ConfirmDeleteModal: React.FC<props> = ({
  title,
  body = null,
  open,
  onClose,
  onConfirm
}) => {
  const classes = useStyles();

  return (
    <Dialog
      disablePortal
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth={true}
      TransitionComponent={Transition}
    >
      {title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      {body && (
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className={classes.delete}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}