/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {
  const [porcentaje, setPorcentaje] = useState()
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (((presupuesto - disponible) / presupuesto) *100).toixed(2)
    setPorcentaje(nuevoPorcentaje)
    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos])
  



  const formatear = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleReset = () => {
    const resultado = window.confirm ('Desea eliminar el presupuesto?')
    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    } 

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos dos-columnas">
      <div>
        <CircularProgressbar 
        
          value={porcentaje}
          text={`${porcentaje}%`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>Resetear Presupuesto</button>
        <p>
          <span>Presupuesto:</span> {formatear(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible:</span> {formatear(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatear(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
