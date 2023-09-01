import React from "react";
import DataTable from "react-data-table-component";
import ScaleLoader from "react-spinners/ScaleLoader";
function Table({ loading, columns, data }) {
  return (
    <DataTable
      progressPending={loading}
      progressComponent={
        <ScaleLoader
          color="#44cef5"
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
      fixedHeaderScrollHeight="300px"
      columns={columns}
      data={data}
      pagination
    />
  );
}

export default Table;
