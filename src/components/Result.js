import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {
    Typography,
    TableHead,
    TableCell,
    TableBody,
    TableRow
}
from '@material-ui/core'
import { Button } from '@material-ui/core';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    textarea: {
        textAlign: "justify",
        paddingTop: theme.spacing(2),
        fontSize: '.8rem'
    },
    dept: {
        fontSize: '.8rem',
    },
    email: {
        paddingTop: theme.spacing(2),
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
        width: '90%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        width:'50%',
        marginButtom: theme.spacing(5)
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

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: ''
        }
    }

    handleChange = (panel) => (event, newExpanded) => {
        this.setState({ expanded: newExpanded ? panel : false });
    };    

    render() {
        const { classes, authenticated, result : { name, email, textarea, courses, panel, dept } } = this.props;

        return (
            <div className={classes.root}>        
                <Accordion square expanded={this.state.expanded === panel} onChange={this.handleChange(panel)}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{name}'s Detail</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                        className={classes.email}>Email:  {email}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Typography className={classes.textarea}>
                            {textarea}
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails>
                        <Typography
                        className={classes.dept}>Department:  {dept}
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
                                    courses.map((item, index) =>{
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
                                        #{courses.length * 2000}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Typography>
                    </AccordionDetails>
                {
                    authenticated && (
                        <div className={classes.actionDiv}>
                        <Button 
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.smMargin}
                            // onClick={() => {openInPopup(record)}}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.smMargin}
                            // onClick={() => {
                            //     setConfirmDialog({
                            //         isOpen: true,
                            //         title: 'Are you sure to delete this record?',
                            //         subTitle: "You can't undo this operation",
                            //         onConfirm: () => {onDelete(record._id)}
                            //     })
                            // }}
                        >
                            Delete
                        </Button>
                        </div>
                    )
                }
            </Accordion>
            </div>
        )  
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

Result.propTypes = {
    user: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(withStyles(styles)(Result))
