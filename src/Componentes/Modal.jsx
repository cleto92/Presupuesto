import React, {useState, useEffect} from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animador, setAnimador, guardarGasto, editar, setEditar}) => {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [id, setId] = useState('')

  const ocultar = () => {
        setAnimador(false)
        setEditar({})
        setTimeout(() => {
          setModal(false)
        }, 500);
    }
      const handleSubmit = (e) => {
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')) {
          setMensaje('Todos los campos son obligatorios')
          return;
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})

      }

        useEffect(() => {
          if(Object.keys(editar).length > 0){
            setNombre(editar.nombre)
            setCantidad(editar.cantidad)
            setCategoria(editar.categoria)
            setId(editar.id)
            setFecha(editar.fecha)
          }
        }, [editar])
        



  return (
    <div className='modal'>
    <div className='cerrar-modal'>
        <img src={CerrarModal} alt='cerrarModal' onClick={ocultar} />
    </div>
    <form onSubmit={handleSubmit} className={`formulario ${animador ? 'animar' : 'cerrar'}`}>
        <legend>{editar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        <div className='campo'>
          <label htmlFor='nombre'>Nombre</label>
          <input type='text' placeholder='Añadir nombre del Gasto' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input type='number' placeholder='Cantidad' id='cantidad' value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
        </div>
        <div className='campo'>
          <label htmlFor=' categoria'>Categoria</label>
          <select id='categoria' onChange={(e) => setCategoria(e.target.value)} value={categoria}>
            <option value="">Seleccionar Categoria</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type='submit' value={editar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
    </form>
    </div>
  )
}

export default Modal