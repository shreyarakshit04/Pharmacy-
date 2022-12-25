import { createContext, useReducer, useState } from 'react';

const initialState={productsList:[],totalOrders:0};

export const orderReducer = (state, action) => {
  switch(action.type) {
    case 'ADD  ORDERS':
      return {
        ...state, 
        productsList: [...state.productsList, action.payload.items],
        totalOrders: action.payload.cartTotal
      }
    
    case 'GET ORDERS':
      return {
        ...state,
        productsList: [action.payload.items],
        totalOrders: 50
      }

    default: 
      return state;
  }
}

export const Context = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [itemList, setItemList] = useState([]);
    const [state,dispatch] = useReducer(orderReducer,initialState);

    function addOrders(items, cartTotal) {
      setItemList(items);
      dispatch({
        type: 'ADD  ORDERS',
        payload: {items, cartTotal}
      })
    }

    function getOrders() {
      console.log(itemList);
      dispatch({
        type: 'GET ORDERS',
        payload: state.productsList
      })
    }

    return (<Context.Provider value={{ 
      productsList: state.productsList,
      totalOrders: state.totalOrders,
            addOrders,
            getOrders
        }}>
            {children}
            </Context.Provider>
    )

}

