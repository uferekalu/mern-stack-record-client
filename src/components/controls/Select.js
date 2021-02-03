import React from 'react'
import { 
    FormControl, 
    FormHelperText, 
    InputLabel,
    makeStyles,
    MenuItem, 
    Select as MuiSelect 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    selectOption: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

export default function Select(props) {

    const { name, value, label, error=null, onChange, options, ...other } = props;
    const classes = useStyles()

    return (
        <FormControl variant="outlined"
            className={classes.selectOption}
            {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect 
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...other}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(item => (
                        <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
