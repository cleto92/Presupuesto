import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  editar,
  setEditar,
  eliminar,
  gastosfiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos'}</h2>
          {gastosfiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setEditar={setEditar}
              eliminar={eliminar}
            />
          ))}
        </>
      ) : (
        <>
        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos'}</h2>
        {gastos.map((gasto) => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setEditar={setEditar}
            eliminar={eliminar}
          />
        ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
