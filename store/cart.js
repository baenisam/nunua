import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

export const actionTypes = {
  addToCart: "ADD_TO_CART",
  clearCart: "CLEAR_CART",
  removeFromCart: "REMOVE_FROM_CART",
  refreshStore: "REFRESH_STORE",
  updateCart: "UPDATE_CART",
};

const initialState = {
  data: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addToCart:
      var findIndex = state.data.findIndex(
        (item) => item.id == action.payload.product.id
      );
      let qty = action.payload.qty ? action.payload.qty : 1;
      if (findIndex !== -1) {
        findIndex = state.data.findIndex(
          (item) => item.name_produit == action.payload.product.name_produit
        );
      }

      if (findIndex !== -1) {
        return {
          data: [
            ...state.data.reduce((acc, product, index) => {
              if (findIndex == index) {
                acc.push({
                  ...product,
                  qty: product.qty + qty,
                  sum:
                    (action.payload.product.price_red
                      ? action.payload.product.price_red
                      : action.payload.product.price_red) *
                    (product.qty + qty),
                });
              } else {
                acc.push(product);
              }

              return acc;
            }, []),
          ],
        };
      } else {
        return {
          data: [
            ...state.data,
            {
              ...action.payload.product,
              qty: qty,
              price_red: action.payload.product.price_red
                ? action.payload.product.price_red
                : action.payload.product.price_red,
              sum:
                qty *
                (action.payload.product.price_red
                  ? action.payload.product.price_red
                  : action.payload.product.price_red),
            },
          ],
        };
      }
    case actionTypes.removeFromCart:
      return {
        data: [
          ...state.data.filter((item) => {
            if (item.id !== action.payload.product.id) return true;
            if (item.name_produit !== action.payload.product.name_produit)
              return true;
            return false;
          }),
        ],
      };

    case actionTypes.clearCart:
      return {
        data: [],
      };

    case actionTypes.updateCart:
      return {
        data: [...action.payload.cartItems],
      };
    case actionTypes.refreshStore:
      return initialState;

    default:
      return state;
  }
};

export const actions = {
  addToCart: (product, qty = 1) => ({
    type: actionTypes.addToCart,
    payload: {
      product: product,
      qty: qty,
    },
  }),

  removeFromCart: (product) => ({
    type: actionTypes.removeFromCart,
    payload: {
      product: product,
    },
  }),
  clearCart: (product) => ({
    type: actionTypes.clearCart,
    payload: {
      product: product,
    },
  }),

  updateCart: (cartItems) => ({
    type: actionTypes.updateCart,
    payload: {
      cartItems: cartItems,
    },
  }),
};

export function* cartSaga() {
  yield takeEvery(actionTypes.addToCart, function* saga(e) {
    toast.success("Produit ajouté au panier");
  });

  yield takeEvery(actionTypes.removeFromCart, function* saga(e) {
    toast.success("Produit retiré du panier");
  });

  yield takeEvery(actionTypes.updateCart, function* saga(e) {
    toast.success("Panier mis à jour avec succès");
  });
}

const persistConfig = {
  keyPrefix: "nunua-",
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);
