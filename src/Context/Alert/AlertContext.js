import { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const ACTION = {
    SET_ALERT: 'set_alert',
    REMOVE_ALERT: 'remove_alert',
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set an alert
  const setAlert = (msg, type) => {
    dispatch({ type: ACTION.SET_ALERT, payload: { msg, type } });

    setTimeout(() => dispatch({ type: ACTION.REMOVE_ALERT }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
