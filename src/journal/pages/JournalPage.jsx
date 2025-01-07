import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
  return (
     <JournalLayout>
        {/* <Typography>Cupidatat reprehenderit consectetur duis dolor deserunt ad nisi laborum laboris irure qui. Fugiat deserunt Lorem aliquip in ullamco ullamco sint. Sint tempor aliquip exercitation incididunt aute magna in in duis nostrud est. Laboris voluptate do qui sunt sit. Lorem ex velit do velit amet minim. Occaecat id non excepteur sunt occaecat adipisicing cillum. Quis culpa commodo fugiat ipsum velit laboris esse eiusmod minim.</Typography> */}
        {/* <NothingSelectedView /> */}
        <NoteView />

         <IconButton
            size='large'
            sx={{
               color: 'white',
               backgroundColor: 'error.main',
               ':hover': { backgroundColor: 'error.main', opacity:0.9 },
               position: 'fixed',
               right: 50,
               bottom: 50
            }}
         >
            <AddOutlined sx={{ fontSize: 30 }}/>
         </IconButton>

     </JournalLayout>
  )
}
