import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login } from '../actions/UserActions'
import { connect } from 'react-redux'

/**
 * Component to login an existing user.
 */
class Login extends Component {
    /**
     * State for credentials of existing user.
     */
    state = {
        email: "",
        password: "",
    }

    /**
     * Updates corresponding form field.
     */
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value}) 
    }

    /**
     * Submits the form and logins an existing user.
     */
    handleSubmit = e => {
        e.preventDefault()
        const creds = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(creds)
    }

    /**
     * HTML and CSS to display. If authenticated (check UserActions),
     * then redirect to home page, if not display fail message and
     * rerender login page.
     */
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/home'/>
        } else if (this.props.isFetching) {
            return <h1>Loading...</h1>
        } else {
            return (
                <div>
                    <div><Link to={'/'}><button className="btn btn-light">Back</button></Link></div>
                    <div className="container" style={style}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="username">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter Email"
                                onChange={this.handleChange.bind(this)}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password"
                                onChange={this.handleChange.bind(this)}></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            <h2>{this.props.errorMessage}</h2>
                        </form>
                    </div>
                </div>
            )
        }
    }
    
}

const style = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string
}

const mapStateToProps = state => ({
    isFetching: state.userAuth.isFetching,
    isAuthenticated: state.userAuth.isAuthenticated,
    errorMessage: state.userAuth.errorMessage
})

export default connect(mapStateToProps, { login })(Login);