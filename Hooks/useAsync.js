import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import useNetwork from "./useNetwork";
import GlobalContext from "~/context/GlobalContext";
const useAsync = (asyncFunction, refresh, isConnected) => {

  const [data, setData] = useState([] || {});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const query = router.query;
  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    (async () => {
      try {
        // if(!load){
        //   setLoading(true)
        // }
        const res = await asyncFunction({ cancelToken: source.token });
        if (!unmounted) {
          setData(res.data.data);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        if (!unmounted) {
          setError(err.message);
          if (axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
            setData([]);
          } else {
            setError(err.message);
            setLoading(false);
            setData([]);
          }
        }
      }
    })();

    return () => {
      unmounted = true;
      source.cancel("error canceled");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, isConnected]);

  return {
    data,
    error,
    loading,
  };
};

export default useAsync;
