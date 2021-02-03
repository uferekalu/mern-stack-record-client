import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/userActions';
import { 
    Grid, 
    Paper, 
    withStyles, 
    Typography,
    Button,
    Toolbar,
    InputAdornment,
    TableBody
} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add'
import PostDataForm from './PostDataForm';
import ButterToast, { Cinnamon } from 'butter-toast';
import { DeleteSweep, Search } from '@material-ui/icons';
import { Controls } from './controls/Controls';
import Popup from './controls/Popup';
import ConfirmDialog from './ConfirmDialog';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import PropTypes from 'prop-types'



const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    textarea: {
        textAlign: "justify",
        paddingTop: theme.spacing(3),
        fontSize: '.8rem'
    },
    dept: {
        fontSize: '.8rem',
    },
    span: {
        fontSize: '14px',
        color: "green",
        marginRight: "100px"
    },
    detail: {
        fontSize: '12px',
        color: 'green',
        marginRight: '150px'
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    },
    searchInput: {
        width: '45%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        '@media screen and (max-width: 600px)':{
            width: '100%'
        }
    },
    newButton: {
        position: 'absolute',
        top: '-2px',
        right: '10px',
        width:'45%',
        marginButtom: theme.spacing(15),
        height: theme.spacing(7),
        '@media screen and (max-width: 600px)':{
            width: '92%',
            marginTop: theme.spacing(12)
        }
    },
    coursesRegistered: {
        fontSize: '.6rem'
    },
    tableCell: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    amountDetail: {
        fontSize: '.8rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    intro: {
        fontSize: '.8rem',
        padding: theme.spacing(2),
        textAlign: "justify",
    },
    accordion: {
        '@media screen and (max-width: 600px)':{
            marginTop: theme.spacing(12)
        }
    }
})

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      marginTop: '2rem',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
      '@media screen and (max-width: 600px)':{
        marginTop: '30px'
    }
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
        color: "white",
        textTransform: 'uppercase',
        backgroundColor: "black",
        fontSize: '.7rem'
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(0),
      backgroundColor: "lightblue"
    },
  }))(MuiAccordionDetails);


const PostData = ({classes, ...props}) => {
    const [expanded, setExpanded] = useState();
    const [currentId, setCurrentId] = useState(0)
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        props.fetchAllPostData()
    }, [])

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        const onSuccess = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content = "Deleted sucessfully"
                    scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                    icon = {<DeleteSweep />}
                />
            })
        }

        props.deletePostData(id, onSuccess)
    }

    const openInPopup = record => {
        setCurrentId(record._id)
        setOpenPopup(true)
    }

    const filterByInput = (e) => {
        let input = e.target.value;
        props.filterPostData({value: input})
    }


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                            <Typography className={classes.intro}>
                                This Demo App uses MongoDB to store records of students who registered for tutorial courses on various departments of their choosing.
                                With login system, one can add some records and be redirected to home page where they would have access to their profile page. 
                                The profile page is still being developed.
                                Accordions are used to show the message describing a little about them, their departments, the number of courses registered
                                and the total amount.
                            </Typography>
                        <Toolbar>
                            <Controls.Input
                                className={classes.searchInput}
                                label="Search by name"
                                    InputProps ={{
                                        startAdornment:(<InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>)
                                    }}
                                onChange={e => {filterByInput(e)}}
                            />
                            <Controls.Button
                                text="Add New"
                                variant="outlined"
                                className={classes.newButton}
                                startIcon={<AddIcon />}
                                onClick={() => {setOpenPopup(true); setCurrentId(0) }}
                            />
                            
                        </Toolbar>
                        <div className={`${classes.root} ${classes.accordion}`}>
                            {
                                props.user.map((record, index) => {
                                    return (
                                        <Accordion square expanded={expanded === record.panel} onChange={handleChange(record.panel)} key={index}>
                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                <Typography>{record.name}'s Detail</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography className={classes.textarea}>
                                                    {record.textarea}
                                                </Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography
                                                className={classes.dept}>Department:  {record.dept}
                                                </Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography className={classes.coursesRegistered}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={classes.tableCell}>
                                                                Name of the course
                                                            </TableCell>
                                                            <TableCell className={classes.tableCell}>
                                                                Amount
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            record.courses.map((item, index) =>{
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{item}</TableCell>
                                                                        <TableCell>2000</TableCell>
                                                                    </TableRow>
                                                                    
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                </Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className={classes.amountDetail}>
                                                                Total amount:
                                                            </TableCell>
                                                            <TableCell className={classes.amountDetail}>
                                                                #{record.courses.length * 2000}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Typography>
                                            </AccordionDetails>
                                            {
                                                props.authenticated && (
                                                    <div className={classes.actionDiv}>
                                                        {record.email === 'dekalusha@gmail.com' && (
                                                            <>
                                                                <Button 
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={classes.smMargin}
                                                                    onClick={() => {openInPopup(record)}}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button 
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    size="small"
                                                                    className={classes.smMargin}
                                                                    onClick={() => {
                                                                        setConfirmDialog({
                                                                            isOpen: true,
                                                                            title: 'Are you sure to delete this record?',
                                                                            subTitle: "You can't undo this operation",
                                                                            onConfirm: () => {onDelete(record._id)}
                                                                        })
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </>
                                                        )
                                                
                                                        }
                                                        
                                                    </div>
                                                    
                                                )
                                            }
                                        </Accordion>
                                    )
                                })
                            }
                        </div>
                    </Paper>
                </Grid>
                <Popup
                    title="Students Tutorial Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <PostDataForm 
                                {...{currentId, setCurrentId}} 
                            />
                        </Paper>
                    </Grid>
                </Popup>
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </Grid>
        </>
    )
}

PostData.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    Delete: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user.list,
    authenticated: state.user.authenticated,
    UI: state.UI
})

const mapActionToProps = {
    fetchAllPostData: actions.getUserData,
    deletePostData: actions.Delete,
    filterPostData: actions.filterByName
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles, Accordion, AccordionSummary, AccordionDetails)(PostData));