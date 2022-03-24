import { useState, useEffect } from "react";
import { crearNuevoProducto } from "../actions/productoActions";
import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [msg, setMsg] = useState("");
  //utilizar use dispatch y te crea una funciona de
  const dispatch = useDispatch();

  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  useEffect(() => {
    if (error) {
      setMsg("Hubo un error");
    }
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [error]);

  const agregarProducto = (producto) => dispatch(crearNuevoProducto(producto));
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    console.log(error);
    //Validar Formulario
    if (nombre.trim() === "" || precio <= 0) {
      setMsg("Todos los campos son obligatorios");
      return;
    }
    setMsg("");
    //Si no hay errores crear el nuevo producto
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
            {cargando ? <p>Cargando...</p> : null}
            {msg !== "" ? (
              <p className="alert alert-danger p-2 mt-4 text-center text-uppercase">
                {msg}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
