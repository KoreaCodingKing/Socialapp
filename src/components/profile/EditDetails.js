import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme,
    button: {
        float: 'right'
    }
});

class EditDetails extends Component {
    // 현재 state 초기화
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    };

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // rendering 전 컴포넌트에 props를 가져옴
    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleChange = (event) => {
        // [] 여러 target이 있기 대문에 사용
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // 위에 handleChange에서 저장한 state값을 userDetails로 저장, editUserDetails로 Action실행.
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="회원 정보변경" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>회원 정보를 수정</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    multiline
                                    placeholder="성별을 입력하세요"
                                    className={classes.textField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="website"
                                    type="text"
                                    label="Website"
                                    multiline
                                    placeholder="개인 블로그 및 사이트를 입력하세요"
                                    className={classes.textField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="location"
                                    type="text"
                                    label="Location"
                                    multiline
                                    placeholder="주소지를 입력하세요"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                취소
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                저장
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
