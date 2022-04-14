import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string;
}

export const Layout:FC<Props> = ({ title = 'OpenJira', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{ title }</title>
            </Head>

            <Navbar />
            <Sidebar />
            <Box sx={{ padding: '30px 30px' }} className={'animate__animated animate__fadeIn'} >
                { children }
            </Box>

        </Box>
    )
}