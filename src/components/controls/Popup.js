import React from 'react'
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    makeStyles,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { Controls } from './Controls';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        width: '80%',
        '& .MuiDialog-paper': {
            width: '80%'
        }
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    closeIcon: {
        color: 'white'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles()
    
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton   
                        color="secondary"
                        onClick={() => setOpenPopup(false)}>
                        <CloseIcon 
                            className={classes.closeIcon}
                        />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
