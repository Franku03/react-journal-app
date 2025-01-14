import { useSelector } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid2, List, ListItem, 
ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"

export const SideBar = ({ drawerWidth = 240 }) => {

  const { displayName } = useSelector( state => state.auth );

  return (
    <Box
      component='nav'
      sx={{ width:{ sm: drawerWidth }, flexShrink:{ sm: 0 } }}
    >
      <Drawer
        variant="permanent" // ? temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          {/* <p style={{ 'fontFamily': 'times-new-roman' }}>sidebar</p> */}
           <Typography variant='h6' noWrap component='div'>
              { displayName }
           </Typography>
        </Toolbar>
        
        <Divider />

        <List>

          {/* // TODO: Automatizar  */}
          
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
              <ListItem key={ text } disablePadding >
                  <ListItemButton>
                    <ListItemIcon>
                        <TurnedInNot />
                    </ListItemIcon>

                    <Grid2 container>
                      <ListItemText primary={ text }/>
                      <ListItemText secondary={ 'Aliqua sint ipsum laboris adipisicing pariatur sunt nisi consectetur eu ea.' }/>
                    </Grid2>

                  </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Drawer>
    </Box>
  )
}
