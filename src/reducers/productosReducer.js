import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  SELECT_PRODUCTO,
  SELECT_PRODUCTO_EXITO,
  SELECT_PRODUCTO_ERROR,
  DELETE_PRODUCTO,
  DELETE_PRODUCTO_EXITO,
  DELETE_PRODUCTO_ERROR,
  EDIT_PRODUCTO,
  COMENZAR_EDIT_PRODUCTO,
  EDIT_PRODUCTO_EXITO,
  EDIT_PRODUCTO_ERROR,
} from "../types";

//cada reducer tiene su propio state

const initialState = {
  productos: [],
  error: false,
  loading: false,
  productoEditar: null,
};

export default function (state = initialState, action) {
  let productoActualizado;
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        productos: [...state.productos, action.payload],
        loading: false,
      };
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SELECT_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case SELECT_PRODUCTO_EXITO:
      return {
        ...state,
        productos: action.payload,
        loading: false,
      };
    case SELECT_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCTO_EXITO:
      productoActualizado = state.productos.filter((producto) =>
        producto.id !== action.payload ? producto : null
      );
      return {
        ...state,
        productos: productoActualizado,
        loading: false,
      };

    case DELETE_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EDIT_PRODUCTO:
      return {
        ...state,
        productoEditar: action.payload,
      };

    case COMENZAR_EDIT_PRODUCTO:
      return {
        ...state,
        loading: true,
      };
    case EDIT_PRODUCTO_EXITO:
      productoActualizado = state.productos.map((producto) =>
        producto.id === action.payload.id ? action.payload : producto
      );
      return {
        ...state,
        productos: productoActualizado,
        productoEditar: null,
        loading: false,
      };

    case EDIT_PRODUCTO_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
