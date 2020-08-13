import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonSpinner,
  IonText,
  IonLabel,
} from "@ionic/react";
import { LogItemType } from "../types/types";
import config from "../Config";
import Axios from "axios";
import { AppCtxt } from "../Context";
import EveryHeader from "../components/EveryHeader";
import moment from "moment";
//@ts-ignore
import ar from "moment/locale/ar";
moment.locale("ar", ar);

export default function RFIDHome() {
  const [rfidLogs, setRfidLogs] = useState<LogItemType[]>([]);
  const [resolveCounter, setResolveCounter] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const { user } = useContext(AppCtxt);
  const contentRef = useRef(null);

  useEffect(() => {
    const getRFIDLogs = async () => {
      const resp = await fetch(
        // TODO change branch id to user branch id
        `${config.API_URL}Scanner/RFIDLog?company=1`
      );
      const data = await resp.json();
      console.log(data);
      setRfidLogs(data);
    };
    getRFIDLogs();
    const intervalId = setInterval(() => {
      getRFIDLogs();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [setRfidLogs, resolveCounter]);

  const simulateStolen = async () => {
    scrollToTop();
    setShowSpinner(true);
    let resp = await fetch(`${config.API_URL}Scanner/random_theft_log`, {
      method: "POST",
    });
    if (resp.status === 200) setResolveCounter(resolveCounter + 1);
    setShowSpinner(false);
  };

  const updateAcknowledge = async (item: LogItemType) => {
    setShowSpinner(true);

    /*
    let resp = await fetch(`${config.API_URL}Scanner/update_acknowledge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ GUID: guid }),
    });
    if (resp.status === 200) setResolveCounter(resolveCounter + 1);
    */
    item.UpdatedBy = user.ID;
    console.log(item);
    let resp = await Axios.post(
      `${config.API_URL}Scanner/update_acknowledge`,
      item
    );
    console.log(resp);
    if (resp.status === 200) setResolveCounter(resolveCounter + 1);
    setShowSpinner(false);
  };

  const scrollToTop = () => {
    // @ts-ignore
    contentRef.current.scrollToTop();
  };

  return (
    <IonPage>
      <EveryHeader title=" التحذيرات" />
      <IonContent
        className="ion-text-center"
        style={{ direction: "rtl" }}
        ref={contentRef}
        scrollEvents={true}
      >
        <div className="ion-margin">
          {showSpinner && <IonSpinner color="primary" />}
          {rfidLogs.map((item: LogItemType) => (
            <IonCard key={item.ItemId} className="">
              <IonCardHeader>
                <IonCardSubtitle
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  {moment(item.CreatedDate).format("Do MMMM YYYY, h:mm a")}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardTitle>{item.ArabicDescription}</IonCardTitle>
              <img
                className="ion-margin-top"
                src={item.ItemImage}
                alt=""
                style={{ width: "100%" }}
              />
              <IonCardSubtitle
                color={item.Status === "1" ? "danger" : ""}
                style={{ fontWeight: "bold" }}
              >
                خروج {item.Status === "1" ? "غير مسموح " : " مسموح"}
              </IonCardSubtitle>
              <IonCardContent>الكود: {item.Code}</IonCardContent>
              <IonButton
                color={"success"}
                onClick={() => updateAcknowledge(item)}
              >
                <IonText style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                  {showSpinner ? <IonSpinner color="primary" /> : "إقرار"}
                </IonText>
              </IonButton>
              <br />
              <br />
            </IonCard>
          ))}
        </div>
        <div className="ion-margin">
          <IonButton color="danger" onClick={simulateStolen}>
            <IonLabel>تجربة خروج غير مسموح</IonLabel>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
