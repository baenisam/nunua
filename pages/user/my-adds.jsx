import React, { useState, useEffect, useContext } from "react";
import UserLayOut from "~/components/user/userLayOut";
import { Card, Table, Spinner } from "reactstrap";
import FadeLoader from "react-spinners/FadeLoader";
import useAsync from "~/Hooks/useAsync";
import CathegorieService from "~/services/CategorieServices";
import ALink from "~/components/features/alink";
import { AiFillDelete, AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Button from "@inovua/reactdatagrid-community/packages/Button";
import GlobalContext from "~/context/GlobalContext";
import useFilter from "~/Hooks/useFilter";

function MyAdds(props) {
  const { handleDelete, isLoading, refresh } = useContext(GlobalContext);
  const gridStyle = { marginTop: 10, minHeight: 550, backgroundColor: "#fff" };
  const { data, loading } = useAsync(
    CathegorieService.getUserAnnonces,
    refresh,
    false
  );
  const { onChangeText, dataTable } = useFilter(data);
  const defaultColumns = [
    {
      name: "id",
      header: "Id",
      defaultVisible: true,
      type: "number",
      minWidth: 40,
    },
    {
      name: "image",
      header: "Image",
      defaultFlex: 2,
      render: ({ value }) => (
        <img
          src={process.env.NEXT_PUBLIC_ASSET_URL + "products/" + value}
          class="rounded-3"
          style={{ width: 20, borderRadius: 5, height: 20, resize: "contain" }}
          alt="Avatar"
        />
      ),
    },
    { name: "name", header: "Titre de l'annonce", defaultFlex: 2 },
    {
      name: "price",
      header: "Prix",
      defaultFlex: 2,
      render: ({ value }) => (
        <span>
          <strong>{value + " $"}</strong>
        </span>
      ),
    },
    {
      name: "id",
      header: "Actions",
      defaultFlex: 3,
      render: ({ value }) => (
        <div className="text-center">
          <ALink
            href={{
              pathname: "/user/edit-add",
              query: { id: value },
            }}
            style={{
              padding: 5,
              borderRadius: 5,
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiFillEdit color="#fff" />
          </ALink>
          <ALink
            href="#"
            onClick={() => handleDelete(value)}
            style={{
              padding: 5,
              borderRadius: 5,
              marginTop: 2,
              marginBottom: 2,
              backgroundColor: "red",
              marginLeft: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AiFillDelete color="#fff" />
          </ALink>
        </div>
      ),
    },
  ];
  const [columns] = useState(defaultColumns);

  return (
    <UserLayOut title={"Mes annonces"}>
      <>
        <div
          className="w-100 d-flex align-items-center justify-content-between"
          style={{ alignItems: "center" }}
        >
          <input
            onChange={onChangeText}
            type="text"
            className="form-control"
            style={{ marginBottom: 0 }}
            placeholder="Recherche"
          />
          <ALink href="/user/create-add">
            <AiFillPlusSquare color="#44cef5" size={50} />
          </ALink>
        </div>
        <ReactDataGrid
          emptyText="Aucune donnée"
          rowStyle={{ paddingBottom: 2 }}
          loading={loading || isLoading}
          style={gridStyle}
          rowHeight={50}
          idProperty="id"
          columns={columns}
          dataSource={dataTable}
          defaultLimit={10}
          pagination
        />
        {/* <Card className="bg-white">
          <div className="mx-auto col-12 col-md-12 col-lg-12">
      
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Prix</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr>
                    <td>{item.id.slice(0, 4)}...</td>
                    <td>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_ASSET_URL +
                          "products/" +
                          item.image
                        }
                        class="rounded-3"
                        style={{ width: 50, borderRadius:5, height:50, resize:"contain" }}
                        alt="Avatar"
                      />
                    </td>
                    <td>{item.name_annonce}</td>
                    <td>{item.price} $</td>
                    <td className="text-center">
                      <button
                        href="#"
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          backgroundColor: "green",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AiFillEdit color="#fff" />
                      </button>
                      <button
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          backgroundColor: "red",
                          marginLeft: 5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AiFillDelete color="#fff" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card> */}
      </>
    </UserLayOut>
  );
}

export default React.memo(MyAdds);
