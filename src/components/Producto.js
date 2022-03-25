import { Link } from "react-router-dom";
import { deleteProducts } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const eliminarProducto = (id) => dispatch(deleteProducts(id));

  const handleClick = () => {
    eliminarProducto(id);
  };
  return (
    <tr>
      <th scope="col">{nombre}</th>
      <th scope="col">
        <span className="font-weight-bold">$ {precio}</span>
      </th>
      <th scope="col" className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
          Editar
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleClick}>
          Eliminar
        </button>
      </th>
    </tr>
  );
};

export default Producto;
