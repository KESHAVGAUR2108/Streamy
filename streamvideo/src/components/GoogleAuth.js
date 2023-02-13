import React from 'react';
import { connect } from 'react-redux';
import { signIn,signOut } from '../actions';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

class GoogleAuth extends React.Component{

    componentDidMount(){
        var userloggedIn = localStorage.getItem('userId');
        if(userloggedIn){
            this.props.signIn(userloggedIn);
        }
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.userId);
        }
        else{
            this.props.signOut();
        }
    }
    
    onSignOutClick = () => {
        this.props.signOut();
        localStorage.clear();
    }

    renderAuthButton = () => {
        if(this.props.isSignedIn === null || this.props.isSignedIn === false){
            return (
                <GoogleLogin className='ui item'
                onSuccess={credentialResponse => {
                    var credential = credentialResponse.credential;
                    var decode = jwt_decode(credential);
                    this.userId = decode.sub;
                    localStorage.setItem('userId',this.userId);
                    this.onAuthChange(true);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            );
        }
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign Out
                </button>
            );
        }
    }

    render(){
        return( 
            <div className='ui item'>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = state => {
    return {isSignedIn : state.auth.isSignedIn};
};

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);