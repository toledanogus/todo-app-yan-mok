import { useEffect } from "react";
import { getTareas } from "../store/slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFiltro2, setTareaID, setTareasActive } from "../store/slices/tareaSlice";
import etiquetaImage1 from "../assets/etiqueta1.png";
import etiquetaImage2 from "../assets/etiqueta2.png";
import etiquetaImage3 from "../assets/etiqueta3.png";
import { es } from "date-fns/locale";
import { format, startOfDay, compareAsc } from "date-fns";
export const ListaTareas = () => {
  //constantes********************************************************
  const dispatch = useDispatch();
  const { tareas, filtro, tareasActive} = useSelector((state) => state.tarea);
  const navigate = useNavigate();

  //Funciones*********************************************************
  const aDetalles = (id, filtro) => {
    dispatch(setTareaID(id));
    dispatch(setFiltro2(filtro));
    navigate("/detalles");
  };

  const aInicio = () => {
    navigate("/inicio");
  };

  const aCalendario = () => {
    navigate("/calendario");
  };

  const formatearFecha = (fechaOriginal) => {
    return format(new Date(fechaOriginal), "dd-MMM", { locale: es });
  };

  const isActive = (categorias) => {
    if (tareas) {
      const nuevasTareas = tareas.map(tarea => {
        if (tarea[6] === categorias && tarea[3] === 0 ) {
          const numerico = compareAsc(startOfDay(new Date()),startOfDay(new Date(tarea[5])));
          if (numerico===0) {
            return [...tarea, "nuevoValor"];
          }else{
            return [...tarea, "nada"];
          }
        } else if(tarea[6] != categorias  && tarea[3] === 0 ){
          const numerico = compareAsc(startOfDay(new Date()),startOfDay(new Date(tarea[5])));
          if (numerico===0) {
            return [...tarea, "nuevoValor"];
          }else{
            return [...tarea, "nada"];
          }
        }
        return tarea;
      });
      dispatch(setTareasActive({ tareasActive: nuevasTareas }));
    }
  }
  //Efectos***********************************************************
  useEffect(() => {
    dispatch(getTareas());
  }, []);

  useEffect(() => {
    if(tareas){
      isActive(filtro);
    }
  }, [tareas]); 

  return (
    <>
      <h1>Lista de Tareas</h1>
      <h2 className="uper">{`${filtro}`}</h2>
      <div className="contenedorx">
        <table>
          <thead>
            {/* <th className="vacio"></th> */}
            <th colSpan="2">Tarea</th>
            <th>Inicio</th>
            <th>Fin</th>
          </thead>

          <tbody>
            {tareasActive &&
              tareasActive.map((elemento, index) => {
                let imageSource;

                if (elemento[2] === 1) {
                  imageSource = etiquetaImage1;
                } else if (elemento[2] === 2) {
                  imageSource = etiquetaImage2;
                } else if (elemento[2] === 3) {
                  imageSource = etiquetaImage3;
                } else {
                  // Default image source if none of the conditions match
                  imageSource = etiquetaImage1;
                }

                return (
                  <tr key={index}>
                    <td>
                      <img src={imageSource} alt="" />
                    </td>
                    <td
                      className={elemento[8] && elemento[8]==='nuevoValor' ? 'activo' : 'tituloTarea'}
                      id={`completa${elemento[3]}`}
                      onClick={() => aDetalles(elemento[7], elemento[6])}
                    >
                      {elemento[0]}
                    </td>
                    <td className="centrado">{formatearFecha(elemento[4])}</td>
                    <td className="centrado">{formatearFecha(elemento[5])}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="contenedorx">
          <button className="calendarioLink" onClick={aCalendario}>Calendario</button>
        </div>
        <button className="aInicio" onClick={aInicio}>
          Inicio
        </button>
      </div>
    </>
  );
};
