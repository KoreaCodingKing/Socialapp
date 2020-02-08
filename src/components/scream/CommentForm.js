import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme
});

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    // static getDerivedStateFromProps(nextProps) {
    //     if (nextProps.UI.errors){
    //         return { errors: nextProps.UI.errors };
    //     }
    //     if(!nextProps.UI.errors && !nextProps.UI.loading){
    //         this.setState({body: ''});
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
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={ {textAlign:'center'} }>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="글을 적으세요"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        onChange={this.handleChange}
                        value={this.state.body}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        댓글 저장
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
