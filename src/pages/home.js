import React, { Component } from 'react'
import PostData from '../components/PostData'
import { Container, AppBar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core'
import ButterToast, { POS_RIGHT, POS_TOP } from 'butter-toast';
import PageHeader from '../components/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'

const styles = theme => ({
    appbar: {
      backgroundColor: "lightblue"
    },
    header: {
      padding: theme.spacing(2)
    },
    butterToast: {
      position: 'absolute',
      top: '3rem',
      right: '2rem'
    },
    
  })

class home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth="lg">
              <AppBar position="static" color="inherit" className={classes.appbar}>
                  <Typography 
                      className={classes.header}
                      variant="h4"
                      align="center"
                  >
                      MERN APP RECORD
                  </Typography>
              </AppBar>
              <PageHeader
                title="MERN STACK"
                subTitle="Click through the Accordions for details of registered students!"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
              />
              <PostData />
              <ButterToast 
                  className={classes.butterToast}
                  position={{vertical: POS_TOP, horizontal: POS_RIGHT}} 
              />
            </Container>
        )
    }
}

export default withStyles(styles)(home)
