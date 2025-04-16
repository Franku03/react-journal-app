import { useMemo } from "react";
import { useSelector } from "react-redux"
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth = 240 }) => {

  const { displayName } = useSelector( state => state.auth );
  const { notes } = useSelector( state => state.journal );

  const notesSorted = useMemo(() => [...notes].sort((n1,n2) => n2.date - n1.date ), [notes]);

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
          {
            notesSorted.map( note => (
              <SideBarItem key={ note.id } { ...note } />
            ))
          }
        </List>

      </Drawer>
    </Box>
  )
}
