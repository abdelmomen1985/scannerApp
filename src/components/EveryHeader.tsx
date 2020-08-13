import React, { ReactChild, ReactChildren } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { arrowForwardSharp, menuOutline } from "ionicons/icons";

import { useHistory } from "react-router-dom";

interface EveryHeaderProps {
  title: string;
  backInstead?: boolean;
  backPush?: string;
  children?: ReactChild | ReactChildren;
}

export default function EveryHeader({
  title,
  backInstead,
  backPush,
  children,
}: EveryHeaderProps) {
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar color="primary" className="main-toolbar">
        <IonButtons slot="end">
          {backInstead ? (
            <IonIcon
              icon={arrowForwardSharp}
              style={{ fontSize: "1.2em" }}
              onClick={() => {
                if (backPush) history.push(backPush);
                else history.goBack();
              }}
            />
          ) : (
            <IonMenuToggle>
              <IonIcon
                style={{ fontSize: "2em" }}
                icon={menuOutline}
                className="ion-padding"
              />
            </IonMenuToggle>
          )}
        </IonButtons>
        <IonButtons slot="start">
          {/** No need for now 
          <IonIcon slot="icon-only" icon={cardOutline} color="light" />
          */}
          {children && children}
        </IonButtons>
        <IonTitle className="ion-text-center"> {title} </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
