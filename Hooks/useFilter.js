import React from "react";
import { useRouter } from "next/router";
const useFilter = (data) => {
  const router = useRouter();
  const [dataTable, setDataTable] = React.useState([]);
  const searchRef = React.useRef("");

  React.useEffect(() => {
        setDataTable(data)
  }, [data])

  const onChangeText = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (router.pathname === "/user/my-adds") {
      if (value) {
        const newData = data.filter((search) =>
          search?.name?.toLowerCase().includes(value.toLowerCase())
        );
        setDataTable(newData);
      } else {
        setDataTable(data);
      }
    }
  };


  return {
    onChangeText,
    dataTable,
  };
};

export default useFilter;
