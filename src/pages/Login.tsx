import React, { SyntheticEvent, useContext, useState } from "react";
import {
  IonPage,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonRouterLink,
} from "@ionic/react";
import { AppCtxt } from "../Context";
import Axios from "axios";
import config from "../Config";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { setUserData } = useContext(AppCtxt);
  const doLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    const goHome = () => {
      // Just to wait till the setUserData take place
      JSON.parse(localStorage.getItem("UserData")!);
      history.push("/rfid_home");
    };

    const { username, password } = e.target as any;
    //props.handleSubmit(email.value, password.value);
    console.log(username.value, password.value);
    const resp = await Axios.post(`${config.API_URL}Scanner/login`, {
      username: username.value,
      password: password.value,
      branch_id: 1,
    });
    setUserData(resp.data);
    goHome();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <form onSubmit={doLogin} style={{ margin: "1em auto" }}>
          <IonRow>
            <IonCol className="column title">
              <IonText className="title">
                <h1>تسجيل الدخول</h1>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="column">
              <IonItem className="item">
                <IonInput
                  className="input"
                  name="username"
                  type="text"
                  placeholder={"اسم المستخدم"}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="column">
              <IonItem className="item">
                <IonInput
                  className="input"
                  placeholder={"كلمة المرور"}
                  name="password"
                  type="password"
                />
              </IonItem>
            </IonCol>
          </IonRow>

          {error && (
            <IonRow>
              <IonCol className="column">
                <IonText color="danger">
                  <p>{error}</p>
                </IonText>
              </IonCol>
            </IonRow>
          )}

          <IonRow className="column">
            <IonCol>
              <IonButton className="column" type="submit">
                {"تسجيل الدخول"}
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
        <br />
        <br />
        <IonRouterLink routerLink="/otp">
          <IonText>التسجيل باستخدام OTP</IonText>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
}
