import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux';
import ButterToast, { Cinnamon } from 'butter-toast';
import { AssignmentTurnedIn } from '@material-ui/icons';
import * as services from '../services';
import { Controls } from './controls/Controls';
import * as actions from '../redux/actions/userActions';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    },
    button: {
        width: '40%',
        margin: 'auto',
        marginLeft: theme.spacing(5),
        '@media screen and (max-width: 600px)': {
            width: '100%',
            margin: 'auto',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(3),
        }
    }
})

const initialFieldValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
    textarea: '',
    dept: '',
    courses: [],
    panel: ''
}

const PostDataForm = ({ classes, ...props }) => {
    const { UI: { loading } } = props
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState(initialFieldValues)
    const [openPopup, setOpenPopup] = useState(false)
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        if (props.currentId !== 0){
            setValues({
                ...props.user.find(x => x._id === props.currentId)
            })
            setErrors({})
        }
        if (props.UI.errors) {
            setErrors(props.UI.errors)
        }
    }, [props.currentId, props.UI.errors])


    const handleInput = (event) => {
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
        setCurrentId(0)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content = "Submitted sucessfully"
                    scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                    icon = {<AssignmentTurnedIn />}
                />
            })
            resetForm()
            setOpenPopup(false)
        }

        const onSuccessUpdate = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content = "Updated sucessfully"
                    scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                    icon = {<AssignmentTurnedIn />}
                />
            })
            resetForm()
            setOpenPopup(false)
        }

        if (props.currentId === 0)
            props.createPostData(values, props.history, onSuccess)
        else
            props.updatePostData(props.currentId, values, onSuccessUpdate, props.history)
    
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <div className={classes.formContent}>
                <Controls.Input
                    name="name"
                    variant="outlined"
                    label="Name"
                    fullWidth
                    value={values.name}
                    onChange={handleInput}
                    error={errors.name}
                    fullWidth
                    type="text"
                />
                <Controls.Input
                    name="email"
                    variant="outlined"
                    label="Email"
                    fullWidth
                    value={values.email}
                    onChange={handleInput}
                    error={errors.email}
                    fullWidth
                    type="text"
                />
                <Controls.Input
                    name="password"
                    variant="outlined"
                    label="Password"
                    fullWidth
                    value={values.password}
                    onChange={handleInput}
                    error={errors.password}
                    fullWidth
                    type="password"
                />
                <Controls.Input
                    name="password2"
                    variant="outlined"
                    label="Confirm Password"
                    fullWidth
                    value={values.password2}
                    onChange={handleInput}
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
                    value={values.textarea}
                    onChange={handleInput}
                    error={errors.textarea}
                    type="text"
                />
                <Controls.Input
                    name="panel"
                    variant="outlined"
                    label="Panel Name"
                    fullWidth
                    value={values.panel}
                    onChange={handleInput}
                    error={errors.panel}
                />
                <Controls.Select 
                    name="dept"
                    label="Department"
                    value={values.dept}
                    onChange={handleInput}
                    options={services.getDepartmentCollection()}
                    error={errors.dept}
                />
                <Controls.Select 
                    name="courses"
                    label="Courses"
                    value={values.courses}
                    onChange={handleInput}
                    options={services.getDepartmentCourses()}
                    error={errors.courses}
                    multiple={true} 
                />
                {errors.email && (
                    <Typography variant="body2" className={classes.customError}>
                        {errors.email}
                    </Typography>
                )}
                <Controls.Button 
                    type="submit"
                    text="Submit"
                    className={classes.button}
                    disabled={loading}
                >
                </Controls.Button>
                <Controls.Button 
                    type="submit"
                    text="Reset"
                    className={classes.button}
                    disabled={loading}
                    color="default"
                    onClick={resetForm}
                >
                    {loading && (
                        <CircularProgress size={10} className={classes.progress} />
                    )}
                </Controls.Button>
                <div className={classes.div}></div>
            </div>
        </form>
    )
}

PostDataForm.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    
}

const mapStateToProps = (state) => ({
    user: state.user.list,
    UI: state.UI
})

const mapActionToProps = {
    createPostData: actions.signupUser,
    updatePostData: actions.updateUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostDataForm));
