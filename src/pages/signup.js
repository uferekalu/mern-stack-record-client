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
import * as services from '../services';
// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions'

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
  },
  div: {
      marginBottom: theme.spacing(10)
  }
})

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            textarea: '',
            dept: '',
            courses: [],
            panel:'',
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
        const newUserData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            textarea: this.state.textarea,
            dept: this.state.dept,
            panel: this.state.panel,
            courses: this.state.courses,
        }

        this.props.signupUser(newUserData, this.props.history)

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
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div className={classes.formContent}>
                            <Controls.Input
                                name="name"
                                variant="outlined"
                                label="Name"
                                fullWidth
                                value={this.state.name}
                                onChange={this.handleInput}
                                error={errors.name}
                                fullWidth
                                type="text"
                            />
                            <Controls.Input
                                name="email"
                                variant="outlined"
                                label="Email"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleInput}
                                error={errors.email}
                                fullWidth
                                type="text"
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
                            <Controls.Input
                                name="password2"
                                variant="outlined"
                                label="Confirm Password"
                                fullWidth
                                value={this.state.password2}
                                onChange={this.handleInput}
                                error={errors.password2}
                                fullWidth
                                type="password"
                            />
                            <Controls.Input
                                name="textarea"
                                variant="outlined"
                                label="Textarea"
                                fullWidth
                                multiline
                                rows={7}
                                value={this.state.textarea}
                                onChange={this.handleInput}
                                error={errors.textarea}
                                type="text"
                            />
                            <Controls.Input
                                name="panel"
                                variant="outlined"
                                label="Panel Name"
                                fullWidth
                                value={this.state.panel}
                                onChange={this.handleInput}
                                error={errors.panel}
                            />
                            <Controls.Select 
                                name="dept"
                                label="Department"
                                value={this.state.dept}
                                onChange={this.handleInput}
                                options={services.getDepartmentCollection()}
                                error={errors.dept}
                            />
                            <Controls.Select 
                                name="courses"
                                label="Courses"
                                value={this.state.courses}
                                onChange={this.handleInput}
                                options={services.getDepartmentCourses()}
                                error={errors.courses}
                                multiple={true} 
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
                                text="Sign Up"
                                fullWidth
                                className={classes.button}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress size={10} className={classes.progress} />
                                )}
                            </Controls.Button>
                            <Typography className={classes.signUpLink}>Already have an account ? login <Link to="/login">here</Link></Typography>
                            <div className={classes.div}></div>
                        </div>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))
