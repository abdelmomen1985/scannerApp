import React, { useContext } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import {
  logOutOutline,
  homeOutline,
  warningOutline,
  receiptOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { AppCtxt } from "../Context";

export default function AppMenu() {
  const history = useHistory();
  const { user, setUserData } = useContext(AppCtxt);
  return (
    <IonMenu side={"end"} menuId="first" contentId="main-content">
      <IonHeader>
        <IonToolbar className="menu-toolbar">
          <IonTitle>{""}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ direction: "rtl" }}>
        <IonMenuToggle>
          <IonList>
            {user?.ID && (
              <>
                <IonItem routerLink="/rfid_home" routerDirection="root">
                  <IonIcon slot="start" icon={warningOutline} color="danger" />
                  <IonLabel color="primary"> التحذيرات</IonLabel>
                </IonItem>
                <IonItem routerLink="/rfid_all/theft" routerDirection="root">
                  <IonIcon slot="start" icon={receiptOutline} />
                  <IonLabel color="primary">سجل التحذيرات</IonLabel>
                </IonItem>
                <IonItem routerLink="/rfid_all/legal" routerDirection="root">
                  <IonIcon slot="start" icon={receiptOutline} />
                  <IonLabel color="primary">سجل خروج الاصناف</IonLabel>
                </IonItem>
              </>
            )}

            {user?.ID && (
              <IonItem
                onClick={() => {
                  // Log out and clear localStorage
                  setUserData(null);
                  localStorage.clear();
                  history.replace("/login");
                  // window.location.reload(false);
                }}
              >
                <IonIcon slot="start" icon={logOutOutline} color="secondary" />
                <IonLabel color="primary">تسجيل الخروج</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
}
