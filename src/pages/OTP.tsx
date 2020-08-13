import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonRow,
  IonText,
} from "@ionic/react";
import Axios from "axios";

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import config from "../Config";
import { AppCtxt } from "../Context";

export default function OTP() {
  const [mobile, setMobile] = useState("");
  const [otpIn, setOtpIn] = useState("");
  const [sendOTP, setSendOTP] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { setUserData } = useContext(AppCtxt);

  const getOTP = async () => {
    console.log(mobile);
    let resp = await Axios.post(`${config.API_URL}Scanner/get_otp`, {
      mobile: mobile,
    });
    console.log(resp);
    if (resp.status === 200) {
      setSendOTP(true);
      setError("");
    } else if (resp.status === 204) {
      setError("الرقم غير صحيح");
    }
  };

  const loginOtp = async () => {
    let resp = await Axios.post(`${config.API_URL}Scanner/login_otp`, {
      mobile: mobile,
      otp: otpIn,
    });
    if (resp.status === 200) {
      const goHome = () => {
        // Just to wait till the setUserData take place
        JSON.parse(localStorage.getItem("UserData")!);
        history.push("/rfid_home");
      };

      setUserData(resp.data);
      goHome();
      setError("");
    } else if (resp.status === 204) {
      setError("الرقم غير صحيح");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        {!sendOTP && (
          <>
            <IonRow>
              <IonCol className="column title">
                <IonText className="title">
                  <h1>رقم الهاتف </h1>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="column">
                <IonItem className="item">
                  <IonInput
                    className="input"
                    name="mobile"
                    type="text"
                    value={mobile}
                    onIonChange={(e) => setMobile(e.detail.value!)}
                    placeholder={"رقم الهاتف"}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="column">
              <IonCol>
                <IonButton className="column" onClick={getOTP}>
                  {"الحصول علي الكود"}
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        )}
        {sendOTP && (
          <>
            <IonRow>
              <IonCol className="column title">
                <IonText className="title">
                  <h1> كود OTP </h1>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="column">
                <IonItem className="item">
                  <IonInput
                    className="input"
                    name="otp_in"
                    type="text"
                    value={otpIn}
                    onIonChange={(e) => setOtpIn(e.detail.value!)}
                    placeholder={"الكود الذي تم استلامه"}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow className="column">
              <IonCol>
                <IonButton className="column" onClick={loginOtp}>
                  {"الدخول"}
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        )}
        {error && (
          <IonRow>
            <IonCol className="column">
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            </IonCol>
          </IonRow>
        )}
      </IonContent>
    </IonPage>
  );
}
