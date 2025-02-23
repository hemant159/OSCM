import React from 'react'
import { Header } from './Header';
import Title from '../shared/Title';
import { Grid } from '@mui/material';

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
        <>
            <Title />
            <Header />
            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid item xs={4} height={"100%"} bgcolor="primary.main">
                    First
                </Grid>
                <Grid item xs={4} height={"100%"} bgcolor="primary.main">
                    <WrappedComponent {...props}/>
                </Grid>
                <Grid item xs={4} height={"100%"} bgcolor="primary.main">
                    Thrid
                </Grid>
            </Grid>
        </>
    );
  };
};

export default AppLayout;