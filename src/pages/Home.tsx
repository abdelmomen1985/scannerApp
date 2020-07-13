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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { useHistory } from "react-router-dom";
import { AppCtxt } from "../Context";

interface Branch {
  ID: string;
  branchNameAr: string;
}
const Home: React.FC = () => {
  const history = useHistory();
  const { setUserData, user } = React.useContext(AppCtxt);
  // TODO handel errors
  const [error, setError] = useState("");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const doLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { username, password, selectedBranchId } = e.target as any;
    const data = {
      username: username.value,
      password: password.value,
      branch_id: selectedBranchId.value,
    };
    console.log(data);
    fetch(`http://13.90.214.197:8081/hrback/public/api/Scanner/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (resp) => {
        let data = await resp.json();

        if (resp.status === 200) setUserData(data);
        else {
          let text = await resp.text();
          console.log(text);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("UserData")) {
      // will get to here if user got updated
      console.log(user);
      history.push("/user_home");
    }
    // Get Branches
    const getBranches = async () => {
      const resp = await fetch(
        `http://13.90.214.197:8081/hrback/public/api/imis_branches?company_id=1`
      );
      const data = await resp.json();
      console.log(data);
      setBranches(data);
    };
    if (!branches.length) getBranches();
  }, [history, branches, user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-text-center">
          <IonTitle>مرحباً</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-text-center">
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
                  <IonSelect
                    style={{ width: "100%", justifyContent: "center" }}
                    value={selectedBranchId}
                    placeholder={"اختر الفرع"}
                    className="input"
                    name="selectedBranchId"
                    onIonChange={(e) => setSelectedBranchId(e.detail.value)}
                  >
                    {branches.map((branch) => (
                      <IonSelectOption key={branch.ID} value={branch.ID}>
                        {branch.branchNameAr}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
