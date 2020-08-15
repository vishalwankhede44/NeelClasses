import React, { useState, useEffect } from "react";
// import "../componentscss/logincontainerCss.css"
import loginImage from "../../images/loginimg.svg";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import firebase from "../../firebase";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVisibilty, setOtpvisibility] = useState(true);
  const [mobileNum, setMobile] = useState("");
  const [firebaseEvent, setEvent] = useState();
  const [loggedIn, setLogin] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([
    "uid",
    "name",
    "mobile",
    "role",
  ]);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    if ({ cookie }.cookie.name == undefined) {
      console.log("Log in first");
      setLogin(false);
      return false;
    } else {
      console.log("Already logged in");
      console.log({ cookie }.cookie.role);
      // props.history.push("/");
      setLogin(true);
      return true;
    }
  }
  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        removeCookie("name");
        removeCookie("mobile");
        removeCookie("uid");
        removeCookie("role");
        console.log("Signout successfully");

        setLogin(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function VerifyOtp(e) {
    e.preventDefault();
    let code = { otp }.otp;

    if (code == null) return;
    firebaseEvent
      .confirm(code)
      .then(function (result) {
        var credential = firebase.auth.PhoneAuthProvider.credential(
          firebaseEvent.verificationId,
          code
        );
        firebase.auth().signInWithCredential(credential);
        console.log(result);
        const LogInfo = {
          mobile: result.user.phoneNumber,
        };

        axios
          .post("http://localhost:5000/getUser", LogInfo)
          .then((res) => {
            // console.log(res.data[0].name);
            // console.log(res.data[0].mobile);
            setCookie("name", res.data[0].name, { path: "/" });
            setCookie("mobile", res.data[0].mobile, { path: "/" });
            setCookie("uid", res.data[0].id, { path: "/" });
            setCookie("role", res.data[0].role, { path: "/" });
            if (res.data[0].role == "Admin") {
              props.history.push("/admin");
            }
          })
          .catch((err) => {
            console.error(err);
          });

        setLogin(true);
      })
      .catch((error) => console.log(error));
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log({ cookie }.cookie.name);
    console.log({ cookie }.cookie.mobile);

    let mobnum = { number }.number;
    mobnum = "+91" + mobnum;
    const SignUpInfo = {
      name: "",
      mobile: mobnum,
    };

    axios
      .post("http://localhost:5000/signup", SignUpInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data != "Done") {
          console.log(res.data);
          let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
          firebase
            .auth()
            .signInWithPhoneNumber(mobnum, recaptcha)
            .then(function (e) {
              setOtpvisibility(false);
              setMobile(mobnum);
              setEvent(e);
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert("Create your account first");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="logincontainer">
      <div className="login-card">
        <div className="login-title">
          <p className="login-title-text">Log In</p>
        </div>
        <Form className="form-body">
          <FormGroup className="form-body-component">
            <Input
              className="mobile-field"
              type="number"
              name="mobile"
              id="exampleMobile"
              placeholder="Mobile Number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </FormGroup>
          <FormGroup className="form-body-component">
            <Input
              className="otp-field"
              type="number"
              maxLength="6"
              name="otp"
              id="exampleOtp"
              placeholder="Enter OTP"
              hidden={otpVisibilty}
              onChange={(event) => setOtp(event.target.value)}
              value={otp}
            />
          </FormGroup>
          <FormGroup>
            <div
              id="recaptcha"
              className="recaptcha"
              hidden={!otpVisibilty}
            ></div>
          </FormGroup>
          <div className="buttons">
            <Button
              className="logbtn"
              type="button"
              onClick={VerifyOtp}
              hidden={otpVisibilty}
            >
              Verify OTP
            </Button>
            <Button
              className="logbtn"
              type="submit"
              onClick={onSubmit}
              hidden={!otpVisibilty}
            >
              Log In
            </Button>
            <Button
              className="logbtn"
              type="button"
              onClick={logOut}
              hidden={!loggedIn}
            >
              Log Out
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(Login);
