import { Link, useNavigate } from "react-router-dom";
import { deleteProducts, updateProductos } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const eliminarProducto = (id) => dispatch(deleteProducts(id));

  const navigate = useNavigate();

  const handleClick = () => {
    eliminarProducto(id);
  };

  //funcion q redirige de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(updateProductos(producto));
    navigate(`/productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <th scope="col">{nombre}</th>
      <th scope="col">
        <span className="font-weight-bold">$ {precio}</span>
      </th>
      <th scope="col" className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={handleClick}>
          Eliminar
        </button>
      </th>
    </tr>
  );
};

export default Producto;
