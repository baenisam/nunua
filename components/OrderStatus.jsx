import React from "react";
import { Badge } from "reactstrap";

const OrderStatus = ({ status }) => {
  return (
    <div>
      {status === "pending" ? (
        <Badge
          className="p-2"
          style={{
            borderRadius: 30,
          }}
          color="warning"
        >
          En attente
        </Badge>
      ) : status === "processing" ? (
        <Badge
          className="p-2"
          style={{
            borderRadius: 30,
            backgroundColor:'orange'
          }}
          color="orange"
        >
          Traitement
        </Badge>
      ) : status === "completed" ? (
        <Badge
          className="p-2"
          style={{
            borderRadius: 30,
          }}
          color="primary"
        >
          Completée
        </Badge>
      ) : status === "delivered" ? (
        <Badge
          className="p-2"
          style={{
            borderRadius: 30,
            backgroundColor:'green'
          }}
          color="#079143"
        >
          Livrée
        </Badge>
      ) : null}
    </div>
  );
};

export default OrderStatus;
