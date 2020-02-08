import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };

    componentDidMount(){
        const handle = this.props.match.params.handle;
        // App.js에서 param 값으로 받은 screamId를 선언
        const screamId = this.props.match.params.screamId;

        // App.js에서 param 값으로 받은 screamId를 선언한게 있으면  state에 저장
        if(screamId) 
            this.setState({ screamIdParam: screamId });

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { screamIdParam } = this.state;
        const { screams, loading } = this.props.data;

        const screamsMarkup = loading ? (
            <ScreamSkeleton/>
        ) : screams === null ? (
            <p>게시글이 없습니다.</p>
        ) : !screamIdParam ? (
            // param값으로 받은 게 아니면, 현재 state에 저장된 screamIdParam값이 null일때 실행
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : (
            // screamIdParam이 있을때 실행
            screams.map(scream => {
                if(scream.screamId !== screamIdParam)
                // 한번 더 걸러내줌 App.js에서 온 screamId값이랑 Scream에서의 screamId값이 같이 않을 때 return
                    return <Scream key={scream.screamId} scream={scream} />
                // App.js에서 온 screamId값이랑 Scream에서의 screamId값이 같을 때 return
                // openDialog는 true로 보내, App.js에서 온 것을 여기서 같다고 한 것을 true형태로 Scream.js로 보내줌
                else return <Scream key={scream.screamId} scream={scream} openDialog />
            })
        )
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (<StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(user);
