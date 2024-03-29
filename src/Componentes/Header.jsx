import React from "react";
import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
  presupuesto,
  setGastos,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setGastos={setGastos} setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto} />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}
    </header>
  );
};

export default Header;
