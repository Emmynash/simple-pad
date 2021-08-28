import React from 'react'
import { createStyles, makeStyles } from "@material-ui/core";
import { NoteTextField } from "components";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
      paddingBottom: 0
    }
  })
)

interface props {
  onchange: React.ChangeEventHandler<HTMLInputElement>,
  value: string
}

export const SideMenuFilter: React.FC<props> = ({ value, onchange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NoteTextField
        name="filter"
        label="fitter"
        value={value}
        onChange={onchange}
        helperText="search tags or title"
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          labelWidth: 40
        }}
      />
    </div>
  )
}