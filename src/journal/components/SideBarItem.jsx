import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"

export const SideBarItem = ({ title = '', body = '', date, id, imageUrls = [] }) => {

  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
     return title.length > 17
        ? title.substring( 0, 27 ) + '...'
        : title;
  }, [ title ]);

  const newBody = useMemo( () => {
    return body.length > 17
      ? body.substring( 0, 30 ) + '...'
      : body;
  }, [ body ])


  const onClickNote = () => {
      dispatch( setActiveNote( { title, body, date, id, imageUrls } ));
  }

  return (
    <ListItem disablePadding >

        <ListItemButton
          onClick={ onClickNote }
        >

          <ListItemIcon>
              <TurnedInNot />
          </ListItemIcon>

          <Grid2 container>
              <ListItemText primary={ newTitle }/>
              <ListItemText secondary={ newBody }/>
          </Grid2>

        </ListItemButton>

    </ListItem>
  )
}
