import React, { Component } from 'react';
import fire from '../../config';
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("key")
        console.log(token)
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            email: '',
            password: '',
            emailError: '',
            loggedIn ,
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.userLogin = this.userLogin.bind(this);

    }

    
    validateEmail = mail => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    };
    handleChangeEmail(event) {
        this.setState({ email: event.target.value,emailError:'' })
    }
    handleChangePass(event) {
        this.setState({ password: event.target.value })
    }
    userLogin(e) {
        e.preventDefault();
        const { email, password } = this.state
        var isCorrect = this.validateEmail(this.state.email);
        const token = 'kgt234/ldf2354ASfhf'
        if (!isCorrect) {
            this.setState({ emailError: "Invalid email address" });
            return false
        } else {
            fire.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user)
                    localStorage.setItem('key', token)
                    this.setState({ loggedIn: true })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        const { loggedIn } = this.state
        console.log(loggedIn)
        if (loggedIn) {
            return <Redirect to='/TodoList' />
        }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <h1>Log In</h1>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}><label htmlFor="">Email:</label></div>
                            <input type="email" className="form-control" value={this.state.value} onChange={this.handleChangeEmail} placeholder="Email" />
                            <div style={{ textAlign: 'left', fontSize: '1rem' }}>
                                {this.state.emailError ?
                                    <p style={{ color: 'red' }}>{this.state.emailError}</p>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}><label htmlFor="">Password:</label></div>
                            <input type="password" value={this.state.value} onChange={this.handleChangePass} className="form-control" placeholder="Password" />

                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4 " style={{ marginTop: '18px' }}>

                            <button onClick={this.userLogin} className="btn btn-primary btn-block btn-flat ">Log In</button>
                            <button onClick={()=>{this.props.history.push('/signup')}} className="btn btn-success btn-block btn-flat ">Sign Up</button>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </>
        )
    }
}