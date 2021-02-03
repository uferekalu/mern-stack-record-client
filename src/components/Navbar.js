import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/actions/userActions'

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const NavBar = ({ authenticated, ...props }) => {
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    }
    return (
        <Route
        render={() => 
            authenticated === true ? 
            <AppBar>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/profile">PROFILE</Button>
                    <Button color="inherit" component={Link} onClick={onLogoutClick}>LOGOUT</Button>
                </Toolbar>
            </AppBar> : 
            <AppBar>
            <Toolbar>
                <Button color="inherit" component={Link} to="/login"> Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Toolbar>
        </AppBar> 
        }
    />
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

NavBar.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { logoutUser } )(NavBar);
