import React, { useReducer } from "react";
import App from "./App";
import { UserType, AppDataType } from "./types/types";

const ACTION_TYPES = {
  CHANGE_CURRENT_LANG: "CHANGE_CURRENT_LANG",
  SET_APP_DATA: "SET_APP_DATA",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
};

const initialState = {
  user: localStorage.getItem("UserData")
    ? (JSON.parse(localStorage.getItem("UserData")!) as UserType)
    : ({} as UserType),
  currentLang: localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "en",
  appData: localStorage.getItem("AppData")
    ? (JSON.parse(localStorage.getItem("AppData")!) as AppDataType)
    : null,
  loggedIn: false,
  setCurrentLang: (lang: string) => {},
  setUserData: (user: UserType) => {},
  setAppData: (data: AppDataType) => {},
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.USER_LOGGED_IN:
      let { user } = action;
      return {
        ...state,
        user,
        loggedIn: true,
      };
    case ACTION_TYPES.CHANGE_CURRENT_LANG:
      const { currentLang } = action;
      return { ...state, currentLang };
    case ACTION_TYPES.USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    case ACTION_TYPES.SET_APP_DATA:
      const { appData } = action;
      return {
        ...state,
        appData,
      };
    default:
      return state;
  }
}

function CtxtProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  function setCurrentLang(lang: string) {
    dispatch({ currentLang: lang, type: ACTION_TYPES.CHANGE_CURRENT_LANG });
  }

  function setUserData(user: UserType) {
    localStorage.setItem("UserData", JSON.stringify(user));
    dispatch({ user, type: ACTION_TYPES.USER_LOGGED_IN });
  }

  function setAppData(appData: AppDataType) {
    localStorage.setItem("AppData", JSON.stringify(appData));
    dispatch({ appData, type: ACTION_TYPES.SET_APP_DATA });
  }

  return (
    <AppCtxt.Provider
      value={{
        currentLang: state.currentLang,
        user: state.user,
        appData: state.appData,
        loggedIn: state.loggedIn,
        setUserData,
        setCurrentLang,
        setAppData,
      }}
      {...props}
    >
      <App />
    </AppCtxt.Provider>
  );
}

export { AppCtxt, CtxtProvider };
