import React, { Component } from 'react';

import fire from '../../config';
import { Redirect } from 'react-router-dom'

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            emailError: '',
            isSignUp:false,
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.userSignUp = this.userSignUp.bind(this);

    }
    validateEmail = mail => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    };
    handleChangeEmail(event) {
        this.setState({ email: event.target.value })
    }
    handleChangePass(event) {
        this.setState({ password: event.target.value })
    }
    userSignUp() {
        const {email,password}= this.state
        var obj = {
            email: email,
            password: password
          }
        var isCorrect = this.validateEmail(this.state.email);
        if (!isCorrect) {
            this.setState({ emailError: "Invalid email address" });
            return false
        }
        else {

            fire.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                var user = userCredential.user;
                console.log(user.uid)
                var db = fire.database().ref(`users/${user.uid}`);
      
                db.push(obj)
                localStorage.removeItem("key")
                this.setState({isSignUp:true})
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
              });
          }
        console.log('asd')
    }
    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        const {isSignUp} = this.state
        if (isSignUp) {
            return <Redirect to='/' />
          }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <h1>SignUp</h1>
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

                            <button onClick={this.userSignUp} className="btn btn-primary btn-block btn-flat ">Sign In</button>
                            <button onClick={()=>{this.props.history.push('/')}} className="btn btn-success btn-block btn-flat ">Log In</button>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </>
        )
    }
}