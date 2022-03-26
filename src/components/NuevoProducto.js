import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { crearNuevoProducto } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

import { paraId } from "../helpers";

const NuevoProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  //utilizar use dispatch y te crea una funciona de
  const dispatch = useDispatch();

  const cargando = useSelector((state) => state.productos.loading);
  const alerta = useSelector((state) => state.alerta.alerta);

  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));

  const navigate = useNavigate();
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //Validar Formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios y el precio tiene que ser mayor a 0",
        classes: "alert alert-danger p-2 mt-4 text-center text-uppercase",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }
    //Si no hay errores crear el nuevo producto
    dispatch(ocultarAlertaAction());
    let id = paraId();
    agregarProducto({ nombre, precio, id });
    navigate("/");
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
            {cargando ? <p>Cargando...</p> : null}
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
