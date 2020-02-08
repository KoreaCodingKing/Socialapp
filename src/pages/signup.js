import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/pengsu.jpg';
import { Link } from 'react-router-dom';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme
});

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors){
            return { errors: nextProps.UI.errors };
        }
        return null;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="pengsu" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        회원가입
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="이메일" 
                            className={classes.textField}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            helperText={errors.email} 
                            error={errors.email ? true : false} 
                            fullWidth
                        />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="비밀번호" 
                            className={classes.textField}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            helperText={errors.password} 
                            error={errors.password ? true : false} 
                            fullWidth
                        />
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="비밀번호 재확인" 
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange} 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false} 
                            fullWidth
                        />
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="아이디" 
                            className={classes.textField}
                            value={this.state.handle}
                            onChange={this.handleChange} 
                            helperText={errors.handle}
                            error={errors.handle ? true : false} 
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            label="회원가입" 
                            className={classes.button}
                            disabled={loading}
                        >
                            회원가입
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>   
                        <small>
                            이미 아이디가 있으신가요? <Link to="/login"> ☞로그인하러 가기 </Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));