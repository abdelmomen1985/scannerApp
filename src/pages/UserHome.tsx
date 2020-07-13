import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSelect,
  IonItem,
  IonLabel,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { AppCtxt } from "../Context";

export default function UserHome() {
  const history = useHistory();
  const { user } = React.useContext(AppCtxt);
  const [wharehouses, setWharehouses] = useState<any[]>([]);
  const [sdeliveryTypes, setSdeliveryTypes] = useState<any[]>([]);

  const [selectedWharehouseID, setSelectedWharehouseID] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");

  useEffect(() => {
    const getWhareHousesAndTypes = async () => {
      const resp = await fetch(
        `http://13.90.214.197:8081/hrback/public/api/imis_warehouses`
      );
      const data = await resp.json();
      console.log(data);
      setWharehouses(data);
    };

    const getSDeliveryTypes = async () => {
      const resp = await fetch(
        // TODO change branch id to user branch id
        `http://13.90.214.197:8081/hrback/public/api/Scanner/sdelivery_types?company=1&branch_id=1`
      );
      const data = await resp.json();
      console.log(data);
      setSdeliveryTypes(data);
    };

    if (!wharehouses.length) getWhareHousesAndTypes();
    if (!sdeliveryTypes.length) getSDeliveryTypes();
  }, [wharehouses, sdeliveryTypes]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">الرئيسية</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" style={{ direction: "rtl" }}>
        <div className="ion-margin ion-padding">
          <IonItem>
            <IonSelect
              style={{}}
              value={selectedWharehouseID}
              placeholder={"اختر المخزن"}
              className="select"
              name="selectedBranchId"
              onIonChange={(e) => setSelectedWharehouseID(e.detail.value)}
            >
              {wharehouses.map((wharehouse) => (
                <IonSelectOption key={wharehouse.GUID} value={wharehouse.GUID}>
                  {wharehouse.ArabicDescription}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect
              style={{}}
              value={selectedTypeId}
              placeholder={"اختر النوع"}
              className="select"
              name="selecteTypeId"
              onIonChange={(e) => setSelectedTypeId(e.detail.value)}
            >
              {sdeliveryTypes.map((deliveryType) => (
                <IonSelectOption
                  key={deliveryType.GUID}
                  value={deliveryType.GUID}
                >
                  {deliveryType.ArabicDescription}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonButton
            expand="block"
            className="ion-margin-top"
            routerLink="/scanner"
            size="large"
          >
            المسح الضوئي
          </IonButton>

          <IonButton
            className="ion-margin-top"
            color="danger"
            expand="block"
            onClick={() => {
              localStorage.clear();
              history.push("/");
              // window.location.reload(false);
            }}
          >
            تسجيل الخروج
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
