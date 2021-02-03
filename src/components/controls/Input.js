import React from 'react'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

export default function Input(props) {

    const { label, name, value, error=null, onChange, ...other } = props;

    const classes = useStyles()

    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={classes.input}
            {...other}
            {...(error && {error:true, helperText:error})}
        />
    )
}
