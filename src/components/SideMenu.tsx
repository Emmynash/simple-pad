import React from 'react';
import { createStyles, makeStyles, Paper, Divider } from "@material-ui/core";
import { useSideBarContext, useNoteContext } from "hooks";
import { SideMenuFilter, NoteList, SideMenuHeader } from "components";
import { useSwipeable } from "react-swipeable";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      flex: expanded => expanded ? '0 0 350px' : '0 0 auto',
      overflowY: 'auto',
      zIndex: 1000,
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        transition: 'left 0.5s',
        maxWidth: '350px',
        width: '100%',
        left: expanded => expanded ? '0px' : '-350px'
      }
    },
    swipe: {
      position: 'absolute',
      height: '100%',
      width: 40,
      zIndex: 20
    }
  })
)

export const SideMenu: React.FC = () => {
  const { expanded, setExpanded } = useSideBarContext();
  const { notes, onFilterChange, filter } = useNoteContext();
  const classes = useStyles();

  const swipeHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true)
  })

  const menuHandler = useSwipeable({
    onSwipedRight: () => setExpanded(true),
    onSwipedLeft: () => setExpanded(false)
  })

  return (
    <>
      {!expanded && (<div className={classes.swipe} {...swipeHandler} />)}
      <Paper className={classes.container} {...menuHandler}>
        <SideMenuHeader
          onClose={() => setExpanded(false)}
          onOpen={() => setExpanded(true)}
          expanded={expanded}
        />
        {expanded &&
          (
            <>
              <SideMenuFilter onchange={onFilterChange} value={filter} />
              <Divider />
              <NoteList notes={notes} />
            </>
          )
        }
      </Paper>
    </>
  )
}