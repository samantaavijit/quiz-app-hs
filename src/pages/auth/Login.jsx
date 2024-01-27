import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import { Card } from "react-bootstrap";
import "./login.css";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  const onlyContainsNumbers = (str) => /^\d+$/.test(str);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100  div_color">
      <Card className="my_card">
        <h5 className="mt-2">Welcome To</h5>
        <h1 className="app_name">Quizee</h1>
        <hr className="hr" />
        {!showOTP ? (
          <Card.Body>
            <div className="mt-1 font-weight-bold">Mobile Verification</div>
            <div className="font-weight-light">
              Please enter your mobile number
            </div>
            <div className="mt-3">
              <input
                className="mb-2"
                type="text"
                value={ph}
                placeholder="0000000000"
                onChange={(e) => {
                  let { value } = e.target;
                  if (onlyContainsNumbers(value) && value.length <= 10) {
                    setPh(value);
                  }
                }}
                readOnly={loading}
              />
              <br />
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setLoading(true);

                  setTimeout(() => {
                    setLoading(false);
                    setShowOTP(true);
                  }, 3000);
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mx-3"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  "Get OTP"
                )}
              </button>
            </div>
          </Card.Body>
        ) : (
          <Card.Body>
            {/* OTP BOX */}
            <div className="mt-1 font-weight-bold">Enter OTP</div>
            <div className="font-weight-light">
              We have send you access code <br /> via SMS for mobile number
              varification
            </div>
            <div className="mt-3">
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container"
              />
              <br />
              <button
                className="btn btn-primary mt-3"
                type="button"
                onClick={() => {
                  setLoading(true);

                  setTimeout(() => {
                    setLoading(false);
                    setShowOTP(false);
                  }, 3000);
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mx-3"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
