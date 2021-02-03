import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { 
    withStyles, 
    Grid,
    Typography
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg'
import { Controls } from '../components/controls/Controls';
// Redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions';


const styles = theme => ({
    
  form: {
    textAlign: 'center'
  },
  img: {
      margin: '20px auto 20px auto',
      width: '40px',
      height: '40px'
  },
  pageTitle: {
      marginTop: '16px',
      marginBottom: '32px'
  },
  customError: {
      color: 'red',
      fontSize: '.8rem',
  },
  signUpLink: {
      marginTop: '32px'
  },
  button: {
      position: 'relative'
  },
  progress: {
      position: 'absolute'
  }
})

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(data, this.props.history);
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="App image" className={classes.img} />
                    <Typography variant="h5" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div className={classes.formContent}>
                            <Controls.Input
                                name="email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleInput}
                                error={errors.email}
                                fullWidth
                            />
                            <Controls.Input
                                name="password"
                                variant="outlined"
                                label="Password"
                                fullWidth
                                value={this.state.password}
                                onChange={this.handleInput}
                                error={errors.password}
                                fullWidth
                                type="password"
                            />
                            {errors.emailnotfound && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.emailnotfound}
                                </Typography>
                            )}
                            {errors.passwordincorrect && (
                                <Typography variant="body2" className={classes.customError}>
                                    {errors.passwordincorrect}
                                </Typography>
                            )}
                            <Controls.Button 
                                type="submit"
                                text="Login"
                                fullWidth
                                className={classes.button}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress size={10} className={classes.progress} />
                                )}
                            </Controls.Button>
                            <Typography className={classes.signUpLink}>Don't have an account ? sign up <Link to="/signup">here</Link></Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
