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

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function crearNuevoProducto(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar en la Base de Datos
      await clienteAxios.post(`/productos`, producto);
      dispatch(agregarProductoExito(producto));
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      //si hay un error cambiar el state
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error, intente de nuevo",
        showConfirmButton: true,
      });
    }
  };
}

const agregarProducto = (estado) => ({
  type: AGREGAR_PRODUCTO,
  payload: estado,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

export function selectProducts() {
  return async (dispatch) => {
    dispatch(selectProduct());
    try {
      //insertar en la Base de Datos
      const products = await clienteAxios(`/productos`);
      dispatch(selectProductExito(products.data));
    } catch (error) {
      console.log(error);
      //si hay un error cambiar el state
      dispatch(selectProductError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error, intente nuevamente en unos segundos",
        showConfirmButton: true,
      });
    }
  };
}

const selectProduct = () => ({
  type: SELECT_PRODUCTO,
});

const selectProductExito = (producto) => ({
  type: SELECT_PRODUCTO_EXITO,
  payload: producto,
});

const selectProductError = (estado) => ({
  type: SELECT_PRODUCTO_ERROR,
  payload: estado,
});

export function deleteProducts(id) {
  return async (dispatch) => {
    dispatch(deleteProduct());
    try {
      //insertar en la Base de Datos
      Swal.fire({
        title: "Desea eliminar este producto?",
        text: "No podrá revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, elimínalo!",
      }).then((result) => {
        if (result.isConfirmed) {
          clienteAxios
            .delete(`/productos/${id}`)
            .then(dispatch(deleteProductExito(id)))
            .then(
              Swal.fire(
                "Eliminado!",
                "Tu producto ha sido eliminado.",
                "success"
              )
            );
        }
      });
      //const products = await clienteAxios.delete(`/productos/${id}`);
    } catch (error) {
      console.log(error);
      //si hay un error cambiar el state
      dispatch(deleteProductError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error, intente nuevamente en unos segundos",
        showConfirmButton: true,
      });
    }
  };
}

const deleteProduct = () => ({
  type: DELETE_PRODUCTO,
});

const deleteProductExito = (id) => ({
  type: DELETE_PRODUCTO_EXITO,
  payload: id,
});

const deleteProductError = (estado) => ({
  type: DELETE_PRODUCTO_ERROR,
  payload: estado,
});

export function updateProductos(producto) {
  return async (dispatch) => {
    dispatch(updateProducto(producto));
  };
}

export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto));
    try {
      //editar en la Base de Datos
      const resultado = await clienteAxios.put(
        `/productos/${producto.id}`,
        producto
      );
      Swal.fire({
        icon: "success",
        title: "Producto editado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(updateProductoExito(producto));
    } catch (error) {
      console.log(error);
      updateProductoError(true);
      Swal.fire({
        icon: "error",
        title: "Hubo un error, intente de nuevo",
        showConfirmButton: true,
      });
    }
  };
}

const editarProducto = (producto) => ({
  type: COMENZAR_EDIT_PRODUCTO,
  payload: producto,
});

const updateProducto = (producto) => ({
  type: EDIT_PRODUCTO,
  payload: producto,
});

const updateProductoExito = (producto) => ({
  type: EDIT_PRODUCTO_EXITO,
  payload: producto,
});

const updateProductoError = (estado) => ({
  type: EDIT_PRODUCTO_ERROR,
  payload: estado,
});
