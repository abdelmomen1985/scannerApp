import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Articles.css";

const Articles: React.FC = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      let articles = await (
        await fetch(`http://13.90.214.197:8089/articles`)
      ).json();
      setArticles(articles);
      console.log(articles);
    };
    fetchArticles();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Articles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Articles</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>{/* Put articles here*/}</div>
      </IonContent>
    </IonPage>
  );
};

export default Articles;
