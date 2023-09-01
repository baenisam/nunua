import { useEffect, useState, useContext } from "react";
import GlobalContext from "~/context/GlobalContext";
function useNetwork() {
  const { isConnected, setIsConnected } = useContext(GlobalContext);
  const [state, setState] = useState({
    online: navigator.onLine,
  });

  useEffect(() => {
    function handleOnlineStatus() {
      setIsConnected(true);
      setState((prevState) => ({
        ...prevState,
        online: true,
      }));
    }
    function handleOfflineStatus() {
      setIsConnected(false);
      setState((prevState) => ({
        ...prevState,
        online: false,
      }));
    }

    window.addEventListener("offline", handleOfflineStatus);
    window.addEventListener("online", handleOnlineStatus);

    return () => {
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, [isConnected]);

  return state;
}

export default useNetwork;
