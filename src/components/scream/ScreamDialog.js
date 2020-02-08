import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typegrphy from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux Stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';

const styles = (theme) => ({
    ...theme,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };

    // 렌더링을 마친 후 만약 Scream에서 props로 받은 openDialog가 true일 경우 handleOpen()실행
    // false로 값을 받아오는 경우는 없기에 else문은 필요없음
    componentDidMount() {
        if(this.props.openDialog){
            this.handleOpen();
        }
    };

    handleOpen = () => {
        // handleOpen()이 실행 될때 실행한 시점의 값을 선언
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        // param 값을 엔드포인트 형식으로 저장
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        // handleOpen()이 실행 될때 실행한 시점의 값(oldPath)와 param 값을 엔드포인트 형식으로 저장한 값(newPath)
        // 같다면 (user페이지로 가서 scream을 봤다는 뜻) 그 user의 page로 oldPath로 저장함.
        if(oldPath === newPath) oldPath=`/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
        // console.log(this.props.screamId, "props로 받아온")
    };

    handleClose = () => {
        // oldPath에 저장된 값의 위치로 이동. 
        window.history.pushState(null, null, this.state.oldPath);
        this.setState ({ open: false });
        this.props.clearErrors();
    };

    render() {
        const { classes, 
                scream: { 
                    screamId, 
                    body, 
                    createdAt, 
                    likeCount, 
                    commentCount, 
                    userImage, 
                    userHandle,
                    comments
                }, 
                UI: { loading } 
            } = this.props;
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typegrphy
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typegrphy>
                    <hr className={classes.invisiableSeparator} />
                    <Typegrphy variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typegrphy>
                    <hr className={classes.invisiableSeparator} />
                    <Typegrphy variant="body1">
                        {body}
                    </Typegrphy>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} 좋아요</span>
                    <MyButton top="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} 댓글 수</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        );

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="게시물 더 보기" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="닫기"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {/* {console.log(screamId, "첫번째 screamId")} */}
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
