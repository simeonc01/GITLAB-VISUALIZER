import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from "@mui/material/TextField";
import { GitLabContext } from './GitlabProvider';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Header(props: Props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [project, setProject] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  const [url, setUrl] = useState<string>("");
  const [tokenID, setTokenID] = useState<string>("");

  const context = useContext(GitLabContext);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Open or close project adding.
  const click = () => {
    setOpenProject(!openProject);
  };

  const clearProject = () => {
    setProject(false)
  };

  const updateProject = () => {
    context.update(tokenID, url)
    console.log(context.error)
    if (!context.error) {
      click();
      setProject(true);
    }
    else {
      console.log("Haha, du token eller url er feil")
    }
    
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        GitLab Visualizer
      </Typography>
      <Divider />
      <List onClick={click}>
        <div>{!project ?
            <ListItem key={"Legg til prosjekt"} disablePadding >
            <ListItemButton sx={{ textAlign: 'center'}}>
              <AddIcon/>
              <ListItemText primary={"Legg til prosjekt"}/>
            </ListItemButton>
          </ListItem> :
          <ListItem key={"Prosjekt Navn"} disablePadding >
            <ListItemButton sx={{ textAlign: 'center'}}>
              <ListItemText primary={"Prosjekt Navn"}/>
            </ListItemButton>
          </ListItem> 
          }
        </div>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Modal
        open={openProject}
        onClose={click}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >{project?
        <Box sx={{ ...style }}>
          <ArrowBackIcon onClick={click}/>
          <h2 style={{textAlign: "center"}}>Prosjekt Navn</h2>
          <p>
            URL: {localStorage.getItem("projectName")}
          </p>
          <p>
            Token id: {localStorage.getItem("token")}
          </p>
          <h5 style={{color:"#0047AB", textAlign:"center"}} onClick={clearProject}>
            Nytt prosjekt?
          </h5>
        </Box> 
        :
        <Box sx={{ ...style }}>
          <ArrowBackIcon onClick={click}/>
          <h2 style={{textAlign: "center"}}>Legg til prosjekt</h2>
          <TextField
              variant="outlined"
              margin="normal"
              type="string"
              required
              fullWidth
              id="url"
              label="URL"
              name="url"
              autoComplete="url"
              autoFocus
              value={url}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => setUrl(event.target.value) }
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="string"
              required
              fullWidth
              name="token_id"
              label="Token ID"
              id="token_id"
              autoComplete="token-id"
              value={tokenID}
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => setTokenID(event.target.value) }
            />
            <br/><br/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={updateProject}
            >
              Hent prosjekt
            </Button>
            <br/><br/>
        </Box>
      }
      </Modal>


      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 3, flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
            >
              GitLab Visualizer
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              
              <div>{!project ?
                <Button onClick={click}  sx={{ color: '#fff' }}>
                  <AddIcon sx={{mr: 1}}/>
                  Legg til prosjekt
                </Button> 
                :
                <Button onClick={click}  sx={{ color: '#fff' }}> 
                {context.currentProject !== null ? context.currentProject.name : "error"}
                </Button>
                }
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" >
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
}
