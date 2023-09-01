import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  userInfo: Cookies.get("nunua_sessions")
    ? JSON.parse(Cookies.get("nunua_sessions"))
    : null,
  shippingAddress: Cookies.get("shippingAddress")
    ? JSON.parse(Cookies.get("shippingAddress"))
    : {},
  couponInfo: Cookies.get("couponInfo")
    ? JSON.parse(Cookies.get("couponInfo"))
    : {},
  registerInfo: Cookies.get("registerInfo")
    ? JSON.parse(Cookies.get("registerInfo"))
    : {},
  country: Cookies.get("country") ? Cookies.get("country") : "CD",
  currency: Cookies.get("currency") ? Cookies.get("currency") : "CD",
  userProfile: Cookies.get("userProfile") ? JSON.parse(Cookies.get("userProfile")) : {},
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_PROFILE":
      return { ...state, userProfile: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        userProfile:null
      };
    case "COUNTRY":
      return {
        ...state,
        country: action.payload,
      };

    case "CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };

    case "REGISTER_INFO":
      return {
        ...state,
        registerInfo: action.payload,
      };

    case "IS_VALIDATED":
      return {
        ...state,
        registerInfo: null,
      };

    case "SAVE_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };

    case "SAVE_COUPON":
      return { ...state, couponInfo: action.payload };
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
