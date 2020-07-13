import React, { SyntheticEvent, useState } from "react";
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
} from "@ionic/react";

export default function Login() {
  const [error, setError] = useState("");
  const doLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { username, password } = e.target as any;
    //props.handleSubmit(email.value, password.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
                {"تسجيل الدحخول"}
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
}
