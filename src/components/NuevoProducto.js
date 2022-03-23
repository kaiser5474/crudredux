import { useState } from "react";
import { crearNuevoProducto } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  //utilizar use dispatch y te crea una funciona de
  const dispatch = useDispatch();
  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    console.log("Prueba");
    //Validar Formulario
    if (nombre.trim() === "" || precio.trim <= "") {
      return;
    }

    //Si no hay errores

    //crear el nuevo producto
    agregarProducto({ nombre, precio });
  };
  return (
    <div className="row justify-content-center ">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label htmlFor="nombreProducto">Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  id="nombreProducto"
                  name="nombreProducto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="precioProducto">Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  id="precioProducto"
                  name="precioProducto"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
