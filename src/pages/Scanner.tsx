import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonRow,
  IonText,
  IonCol,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AppCtxt } from "../Context";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import {
  removeCircleOutline,
  arrowBackSharp,
  arrowForwardSharp,
} from "ionicons/icons";
export default function Scanner() {
  const history = useHistory();
  const { user } = React.useContext(AppCtxt);

  const [barCodes, setBarCodes] = useState<string[]>([]);
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    console.log(`Barcode data: ${data.text}`);
    setBarCodes([...barCodes, data.text]);
  };

  const sendCodes = async () => {
    setBarCodes([]);
  };

  const removeCode = (barcode: string) => {
    let newArr = barCodes.filter((code) => code !== barcode);
    setBarCodes(newArr);
  };

  // TODO : input count
  // TODO : reduce count
  // TODO : input manually

  useEffect(() => {}, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonIcon
              icon={arrowForwardSharp}
              style={{ fontSize: "1.2em", margin: "0 .5em" }}
              onClick={() => {
                history.goBack();
              }}
            />
          </IonButtons>
          <IonTitle className="ion-text-center">مسح الاكواد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <div className="ion-margin ion-padding">
          <div>
            {barCodes.map((barcode) => (
              <IonRow className="barcode ion-margin">
                <IonCol size="9">
                  <IonText>{barcode}</IonText>
                </IonCol>
                <IonCol size="3">
                  <IonIcon
                    icon={removeCircleOutline}
                    color="danger"
                    onClick={() => removeCode(barcode)}
                  />
                </IonCol>
              </IonRow>
            ))}
          </div>
          <IonButton expand="block" onClick={openScanner} size="large">
            Scan
          </IonButton>
          {barCodes.length > 0 && (
            <IonButton
              expand="block"
              color="success"
              className="ion-margin-top"
              onClick={sendCodes}
            >
              ارسال
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
