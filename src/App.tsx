import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Articles from "./pages/Articles";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";
import Requests from "./pages/Requests";
import UserHome from "./pages/UserHome";
import Scanner from "./pages/Scanner";
import PDAScanner from "./pages/PDAScanner";
import RFIDHome from "./pages/RFIDHome";
import RFIDAll from "./pages/RFIDAll";
import AppMenu from "./components/AppMenu";
import OTP from "./pages/OTP";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/** 
      <IonTabs>
      */}
      <IonSplitPane contentId="main-content">
        <AppMenu />
        <IonRouterOutlet id="main-content">
          <Route path="/home" component={Home} exact={true} />
          <Route path="/otp" component={OTP} exact={true} />
          <Route path="/user_home" component={UserHome} exact={true} />
          <Route path="/scanner" component={Scanner} exact={true} />
          <Route path="/rfid_home" component={RFIDHome} exact={true} />
          <Route path="/rfid_all/:what" component={RFIDAll} exact={true} />
          <Route path="/pda_scanner" component={PDAScanner} exact={true} />
          <Route path="/articles" component={Articles} />
          <Route path="/login" component={Login} />
          <Route path="/requests" component={Requests} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        {/** 
        <IonTabBar slot="bottom">
          
          <IonTabButton tab="home" href="/">
            <IonIcon icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="articles" href="/articles">
            <IonIcon icon={ellipse} />
            <IonLabel>Articles</IonLabel>
          </IonTabButton>
          <IonTabButton tab="login" href="/login">
            <IonIcon icon={square} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="requests" href="/requests">
            <IonIcon icon={call} />
            <IonLabel>Requests</IonLabel>
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
      */}
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
