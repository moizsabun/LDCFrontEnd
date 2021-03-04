import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Controls } from "../Controls/Controls";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    dialogTitle: {
        textAlign: 'center'
    },
    titleIcon : {
        backgroundColor : theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover' : {
            backgroundColor : theme.palette.secondary.light,
            cursor : 'default'
        },
        '& .MuiSvgIcon-root' :{
            fontSize : '8rem'
        }
        
    }

}))

export default function ConfirmDialogue(props) {

    const { ConfirmDialog, setConfirmDialog } = props
    const classes = useStyles();
    return (
        <Dialog open={ConfirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className = {classes.dialogTitle}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon></NotListedLocationIcon>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>

                <Typography varaint="h6">
                    {ConfirmDialog.title}
                </Typography>
                <Typography varaint="subtitle2">
                    {ConfirmDialog.subtitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button color="default" onClick={()=> {
                    setConfirmDialog ({...ConfirmDialog, isOpen : false})
                }}>
                    NO
        </Controls.Button>
                <Controls.Button color="secondary" onClick= {ConfirmDialog.onConfirm}>
                    YES
        </Controls.Button>
            </DialogActions>
        </Dialog>
    )
}
