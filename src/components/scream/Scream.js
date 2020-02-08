import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux stuff
import { connect } from 'react-redux'; 

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { 
            classes, 
            scream: { 
                body, createdAt, userImage, userHandle, screamId, likeCount, commentCount 
            },
            user: {
                authenticated,
                credentials: {handle}
            }
        } =this.props;

        // const classes = this.props.classes;
        // authenticated가 있고 현재 scream의 userHandle과, user의 handle이 같으면 DeleteScream 실행
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow( )}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} 좋아요</span>
                    <MyButton top="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} 댓글 수</span>
                    {/* props로 받은 openDialog를 ScreamDialog로 보냄*/}
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}
// profile.js와 다른점은 현재는 user을 통해 authenticated를 object형으로 가져옴
// profile.js에서는 user의 authentication을 가져온거라 bool형으로 가져옴
// openDialog는 user.js에서 받은 값을 props로 받아 위의 ScreamDialog로 보내줌
Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

 const mapStateToProps = state => ({
     user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream));
