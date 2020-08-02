import React , {useState,useEffect} from 'react';
// import "../componentscss/logincontainerCss.css"
import loginImage from "../../images/loginimg.svg";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import axios from 'axios';
import firebase from '../../firebase';
import {Redirect} from 'react-router-dom'
import { useCookies } from 'react-cookie';

 const Login = () => {

    const [number,setNumber] = useState('');
    const [otp,setOtp] = useState('');
    const [otpVisibilty,setOtpvisibility] = useState(true);
    const [mobileNum,setMobile] = useState('');
    const [firebaseEvent,setEvent] = useState();
    const [loggedIn,setLogin] = useState(false);
    const [cookie, setCookie,removeCookie] = useCookies(['uid','name','mobile']);
    
    useEffect(() => {
        checkLogin();
        
      });

    function checkLogin(){
        if({cookie}.cookie.name == undefined){
            console.log("Log in first");
            return false;
        }else{
            console.log("Already logged in");
            return true;
        }
        
    }
    function logOut()
    {
        firebase.auth().signOut().then(function() {
            removeCookie('name');
            removeCookie('mobile');
            removeCookie('uid');
            console.log("Signout successfully");

            setLogin(false);
          }).catch(function(error) {
            console.log(error);
          });
    }
    
    function VerifyOtp(e) {
        e.preventDefault();
        let code ={otp}.otp;
       
        if(code == null) return;
        firebaseEvent.confirm(code).then(function(result){
            var credential = firebase.auth.PhoneAuthProvider.credential(firebaseEvent.verificationId, code);
            firebase.auth().signInWithCredential(credential);
            console.log(result);
            const LogInfo = {
                'mobile':result.user.phoneNumber
            };

            axios
            .post('http://localhost:5000/getUser', LogInfo)
            .then((res) => {
                // console.log(res.data[0].name);
                // console.log(res.data[0].mobile);
                setCookie('name', res.data[0].name, { path: '/' });
                setCookie('mobile', res.data[0].mobile, { path: '/' });
                setCookie('uid', res.data[0].id, { path: '/' });
                console.log({cookie});
            })
            .catch(err => {
            console.error(err);
            });
            
            setLogin(true);
        }).catch((error) => console.log(error));
    }
    function onSubmit (e) {
                e.preventDefault();
                console.log({cookie}.cookie.name);
                console.log({cookie}.cookie.mobile);
                
            let mobnum = {number}.number;
            mobnum = '+91'+mobnum;
            const SignUpInfo = {
                'name':'',
                'mobile':mobnum
            };

            axios
            .post('http://localhost:5000/signup', SignUpInfo)
            .then((res) => {
                console.log(res.data);
                if(res.data != "Done"){
                    console.log(res.data);
                    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                    firebase.auth().signInWithPhoneNumber(mobnum,recaptcha).then(function(e){
            
                        setOtpvisibility(false);
                        setMobile(mobnum);
                        setEvent(e);
                       
                    })
                    .catch( err => {alert(err);})
                    
                }
                else{
                   alert("Create your account first");
                }
            })
            .catch(err => {
            console.error(err);
            });
      
        }
    return (
        <main>
        <div className="container logincontainer">
            <label></label>
            <div className="row d-flex">
                <div className="col-10 offset-1 col-md-4 offset-md-1 order-md-1 order-2 ">
                    <figure>
                        <img src={loginImage} class="img-fluid mt-5 mt-md-0" height="150"></img>
                    </figure>
                </div>
                <div className="col-10 offset-1 col-md-4 order-md-2 offset-md-1 order-1">
                    <h1 className="text-left mb-2">Log In</h1>
                    <Form >
                        <FormGroup>
                            <Input type="number" name="mobile" id="exampleMobile" placeholder="Mobile Number"
                            value={number}
                            onChange={event => setNumber(event.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" maxLength="6" name="otp" id="exampleOtp" placeholder="Enter OTP"
                             hidden={otpVisibilty} onChange={event => setOtp(event.target.value)} value={otp} />
                        </FormGroup>
                        <FormGroup>
                        <div id="recaptcha" class="mb-2" hidden={!otpVisibilty}></div>
                        </FormGroup>
                        <Button className= "logbtn" type="button" onClick={VerifyOtp} hidden={otpVisibilty}>Verify OTP</Button>
                        <Button className="logbtn" type="submit" onClick={onSubmit} hidden={!otpVisibilty}>Log In</Button>
                        <Button className="logbtn" type="button" onClick={logOut} hidden={!loggedIn}>Log Out</Button>
                    </Form>
                </div>
            </div>
        </div>
        </main>
    );
}

export default Login;;