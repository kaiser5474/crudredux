import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";

export function crearNuevoProducto(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar en la Base de Datos
      await clienteAxios.post(`/productos`, producto);
      dispatch(agregarProductoExito(producto));
    } catch (error) {
      console.log(error);
      //si hay un error cambiar el state
      dispatch(agregarProductoError(true));
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
