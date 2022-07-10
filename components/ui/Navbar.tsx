import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { UIContext } from '../../context/ui';
import { EntriesContext } from '../../context/entries';
export const Navbar = () => {

    const { openSideMenu } = useContext( UIContext );
    const { resetEntries, entries } = useContext( EntriesContext );



    const handleClick = () => {
        console.log('entradas');
        resetEntries();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        onClick={ openSideMenu }
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                    <NextLink href="/" passHref >
                        <Link underline='none' color={{color: 'white'}}  sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="div">OpenJira</Typography>
                        </Link>
                    </NextLink>
                    <Button
                        onClick={ handleClick }
                        color='inherit'
                        disableRipple
                        variant="contained"
                        sx={{ 
                            color: 'white', 
                            backgroundColor: '#be123c',  
                            border: 'none',
                            '&:hover': {
                                backgroundColor: 'rgb(190, 18, 60, 0.8)',
                            },
                            textTransform: 'capitalize' 
                        }}
                    >
                        <RestartAltIcon />
                        reset entries
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
};