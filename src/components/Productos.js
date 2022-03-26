import { useEffect } from "react";
import { selectProducts } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";
import Producto from "./Producto";
import { ocultarAlertaAction } from "../actions/alertaActions";

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.productos);
  const loading = useSelector((state) => state.productos.loading);

  useEffect(() => {
    dispatch(ocultarAlertaAction());
    const seleccionarProductos = () => dispatch(selectProducts());
    seleccionarProductos();
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h2 className="text-center my-5">Listado de Productos</h2>
          {productos?.length > 0 ? (
            <table className="table table-striped">
              <thead className="bg-primary table-dark">
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <Producto producto={producto} key={producto.id} />
                ))}
              </tbody>
            </table>
          ) : (
            <h6 className="text-center my-5">No hay productos</h6>
          )}
        </>
      )}
    </>
  );
};

export default Productos;
