import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
} from "@ionic/react";
import { LogItemType } from "../types/types";
import config from "../Config";
import EveryHeader from "../components/EveryHeader";
import moment from "moment";
import { RouteComponentProps } from "react-router";
//@ts-ignore
import ar from "moment/locale/ar";
moment.locale("ar", ar);

export default function RFIDAll({ match }: RouteComponentProps) {
  const { what } = match.params as any;
  const [rfidLogs, setRfidLogs] = useState<LogItemType[]>([]);

  useEffect(() => {
    const getRFIDLogs = async () => {
      const resp = await fetch(
        // TODO change branch id to user branch id
        `${config.API_URL}Scanner/RFIDLogAll?company=1&status=${
          what === "theft" ? 1 : 0
        }`
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
  }, [setRfidLogs, what]);

  return (
    <IonPage>
      <EveryHeader
        title={what === "theft" ? "سجل التحذيرات" : "سجل خروج الاصناف"}
      />
      <IonContent className="ion-text-center" style={{ direction: "rtl" }}>
        <div className="ion-margin">
          {rfidLogs.map((item: LogItemType) => (
            <IonCard key={item.ItemId + item.CreatedDate} className="">
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
              <IonCardContent>
                الكود: {item.Code}
                <div>
                  <IonText
                    color={item.Acknowledge === "1" ? "success" : "danger"}
                    style={{ fontSize: "1.2em", fontWeight: "bold" }}
                  >
                    {item.Acknowledge === "1" ? "تم الحل" : "لم يتم الحل"}
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
        <div className="ion-margin-top"></div>
      </IonContent>
    </IonPage>
  );
}
