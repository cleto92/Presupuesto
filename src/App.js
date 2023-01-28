import { useState, useEffect } from "react";
import Filtros from "./Componentes/Filtros";
import Header from "./Componentes/Header";
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from "./Componentes/ListadoGastos";
import Modal from "./Componentes/Modal";
import { generarId } from "./Helpers";



function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false)
  const [animador, setAnimador] = useState(false)
  const [editar, setEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosfiltrados, setGastosFiltrados] = useState([])

    const eliminar = (id) => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
      setGastos(gastosActualizados)
    }


    useEffect(() => {
      if(Object.keys(editar).length > 0){
        setModal(true)
        setTimeout(() => {
          setAnimador(true)
        }, 500);
      }
   
    }, [editar])


      
    

 const handleNuevoGasto = () => {
    setModal(true)
    setEditar({})
    setTimeout(() => {
      setAnimador(true)
    }, 500);
  }

  const guardarGasto = gasto => {
        if(gasto.id) {
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados)
        
            // eslint-disable-next-line no-const-assign
            setEditar=({})

            } else {
          gasto.id = generarId()
          gasto.fecha = Date.now()
          setGastos([...gastos, gasto])
        }

    setAnimador(false)
    setTimeout(() => {
      setModal(false)
    }, 500);

     }

     useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
     }, [presupuesto])

     useEffect (() => {
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? [] )
     }, [gastos])

     useEffect(() => {
        if(filtro) {
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
              setGastosFiltrados(gastosFiltrados)
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [filtro])

     useEffect(() =>{
      const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
        if(presupuestoLS > 0) {
          setIsValidPresupuesto(true)
        }
     }, [])
     

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />
        {isValidPresupuesto && (
          <>
          <main>
            <Filtros
            filtros={filtro}
            setFiltro={setFiltro} 
            />
           <ListadoGastos gastos={gastos} editar={editar} setEditar={setEditar} eliminar={eliminar} filtro={filtro} gastosfiltrados={gastosfiltrados} />
          </main>
          <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt='iconoGasto' onClick={handleNuevoGasto} />
          </div>
          </>
        )}
        {modal && <Modal setModal={setModal} 
        modal={modal} animador={animador} 
        setAnimador={setAnimador} 
        guardarGasto = {guardarGasto}
        editar={editar}
        setEditar={setEditar}
        />}
    </div>
  );
}

export default App;
