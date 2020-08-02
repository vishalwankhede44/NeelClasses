import React, {useState} from 'react';
// import "../componentscss/logincontainerCss.css";
import signUpImage from "../../images/loginimg.svg";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import firebase from '../../firebase';

const SignUp = () => {
    const [name,setName] = useState('');
    const [number,setNumber] = useState('');
    const [otp,setOtp] = useState('');
    const [otpVisibilty,setOtpvisibility] = useState(true);
    const [fullName,setFullName] = useState('');
    const [mobileNum,setMobile] = useState('');
    const [firebaseEvent,setEvent] = useState();
    const [verify,setVerify] = useState(true);
    function VerifyOtp(e) {
        e.preventDefault();
        let code ={otp}.otp;
        console.log(typeof code);
        console.log(code);
        if(code == null) return;
        firebaseEvent.confirm(code).then(function(result){
            console.log(result.user,'user');
           
            document.querySelector('label').textContent ="Account Registered Successfully";
            
            let fullname = fullName;
            const mobnum = mobileNum;
            
            const SignUpInfo = {
                'name':fullname,
                'mobile':mobnum
            };
            console.log(SignUpInfo);
            axios
                .post('http://localhost:5000/adduser', SignUpInfo)
                .then((res) => {
                    console.log(res.data);
                    if(res.data == "Done"){
                        setVerify(false);
                    }
                    else{
                        console.log("You're account already exist");
                    }
                })
                .catch(err => {
                alert(err);
                });

        }).catch((error) => console.log(error));
    }
    function onSubmit (e) {
        e.preventDefault();
        let fullname = {name}.name;
        const mobnum = {number}.number;


        const SignUpInfo = {
            'name':fullname,
            'mobile':mobnum
        };
        

        axios
            .post('http://localhost:5000/signup', SignUpInfo)
            .then((res) => {
                console.log(res.data);
                if(res.data == "Done"){
                    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                    let fname = {name}.name;
                    let num = {number}.number;
                    num = '+91'+num;
                    console.log(num);
                    console.log(typeof num);
                    firebase.auth().signInWithPhoneNumber(num,recaptcha).then(function(e){
            
                        setOtpvisibility(false);
                        setFullName(fname);
                        setMobile(num);
                        setEvent(e);
                       
                    })
                    .catch( err => {alert(err);})
                    
                }
                else{
                   alert("Account Already Exist ! Please Log In");
                }
            })
            .catch(err => {
            console.error(err);
            });

    }
    return(
        <main>
            <div class="container logincontainer">
                <div className="row ">
                    <label className="col-10 offset-1 alert alert-success text-center " hidden={verify}><strong>Success ! &nbsp;</strong></label>
            </div>
                <div className="row d-flex">
                <div class="col-10 offset-1 col-md-4 offset-md-1 order-md-1 order-2 ">
                    <figure>
                        <img src={signUpImage} class="img-fluid mt-5" height="150"></img>
                    </figure>
                </div>
                <div class="col-10 offset-1 col-md-4 order-md-2 offset-md-1 order-1">
                    <h1 class="text-left mb-2">Sign Up</h1>
                    <Form>
                        <FormGroup>
                            <Input type="text" name="funame" id="exampleName" placeholder="Full Name" 
                            value={name}
                           onChange={event => setName(event.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" name="mobile" id="exampleMobile" placeholder="Mobile Number"
                            value={number}
                            onChange={event => setNumber(event.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" maxLength="6" name="otp" id="exampleOtp" placeholder="Enter OTP"
                             hidden={otpVisibilty} onChange={event => setOtp(event.target.value)} value={otp} />
                        </FormGroup>
                        <div id="recaptcha" class="mb-2" hidden={!otpVisibilty}></div>
                        <Button className="logbtn" onClick={VerifyOtp} hidden={otpVisibilty}>Verify OTP</Button>
                        <Button className="logbtn"  onClick={onSubmit} hidden={!otpVisibilty}>Sign Up</Button>
                      
                    </Form>
                </div>
             </div>
            </div>
        </main>
    );
}

export default SignUp;