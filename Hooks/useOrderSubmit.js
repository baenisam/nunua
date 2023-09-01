import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { notifyError, notifySuccess } from "~/utils/toast";
import { cartPriceTotal } from "~/utils/index";
import OrderServices from "~/services/OrderServices";
import GlobalContext from "~/context/GlobalContext";

const useOrderSubmit = ({ cart }, ...props) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(UserContext);
  const { paymentMethod } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const { registerInfo } = state;

  const submitHandler = (values) => {
    setLoading(true);
    const cookieTimeOut = 365;
    Cookies.set("billingInformations", JSON.stringify(values), {
      expires: cookieTimeOut,
    });

    //console.log(cartPriceTotal(cart));
    const data = {
      payment_method: "cash",
      customer_name: values.first_name,
      customer_address: values.adresse,
      country: values.pays,
      city: values.ville,
      zipCode: "042",
      phone: values.phone,
      email: values.email,
      currency: "$",
      total: cartPriceTotal(cart),
      shipping_cost: "20",
      cart: cart?.map((item) => {
        return {
          id: item.id,
          quantity: item.qty,
          price: item.price_red,
          id_entreprise: item.id_entrep,
        };
      }),
    }



    OrderServices.createOrder(data)
      .then((response) => {
        setLoading(false);
        notifySuccess(response.data.message);
       // router.replace("/user/dashboard");
        //props.clearCart();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return {
    submitHandler,
    loading,
    router,
  };
};

export default useOrderSubmit;
