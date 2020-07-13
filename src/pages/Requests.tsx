import React, { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

export default function Requests() {
  useEffect(() => {
    const fetchRequests = async () => {
      let requests = await (
        await fetch(`http://13.90.214.197:8089/requests`)
      ).json();
      console.log(requests);
    };
    fetchRequests();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Requests</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
}
