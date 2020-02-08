import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme,
    submitButton: {
        position:'relative',
        float: 'right',
        marginTop: 10
    },
    progressSniper: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

class PostScream extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };
    // componentWillUpdate(nextProps){
    //     if(nextProps.UI.errors){
    //         this.setState({ errors: nextProps.UI.errors });
    //     }
    //     if (!nextProps.UI.errors && !nextProps.UI.loading) {
    //         this.setState({body:'', open: false, errors: {} });
    //     }
    // };
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if(nextProps.UI.errors){
    //         return ({ errors: nextProps.UI.errors, open:'false'})
    //     }
    //     if(!nextProps.UI.errors && !nextProps.UI.loading && nextProps.open==='false'){
    //         this.setState({open:'false'});

    //         return ({body:'', open:'false', errors: {} });
    //     }
    //     return null;
    // };
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body:'', open: false, errors: {}});
        }
    }
    handleOpen = () => {
        console.log(this.state.open, '1open됨?');
        this.setState({ open: true });
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false, errors: {} });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    };
    render(){
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        console.log(this.state.open, '3open됨?');

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="게시글 쓰기">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>게시글 등록</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name="body" 
                                type="text" 
                                label="게시글" 
                                multiline 
                                rows="3" 
                                placeholder="게시글 입력" 
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <Button type="submit" variant="contained" color="primary"
                                className={classes.submitButton} disable={loading}>
                                    저장
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));