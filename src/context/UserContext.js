import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
  token: localStorage.getItem("token"),
  cart: [],
  totalCart: { subtotal: 0, quantity: 0, total: 0 },
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        isLogin: false,
        user: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case "ADD_TO_CART":
      const isInCart = state.cart.filter(
        (product) => product.id === action.payload.id
      );
      if (isInCart.length > 0) {
        const inCart = state.cart.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });
        return {
          ...state,
          cart: inCart,
        };
      }
      const newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        cart: newCart,
      };
    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;
    case "DECREASE_CART":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        }),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "RESET_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_CART":
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        return state;
      }
      return { ...state, cart: JSON.parse(cartData) };
    case "GET_TOTAL_CART":
      if (state.cart.length > 0) {
        let subtotal = 0,
          quantity = 0,
          total = 0;
        state.cart.map((item) => {
          subtotal += +item.price;
          quantity += +item.quantity;
          total += +item.price * +item.quantity;
        });
        return {
          ...state,
          totalCart: { subtotal, quantity, total },
        };
      } else {
        return {
          ...state,
          totalCart: initialState.totalCart,
        };
      }

    default:
      throw new Error("unknown cases");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  // console.log(state);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
