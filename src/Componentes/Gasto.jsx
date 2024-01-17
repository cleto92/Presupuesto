import React from 'react'
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../Helpers'
import IconoCasa from '../img/icono_casa.svg'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'

const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones,
}

const Gasto = ({gasto, setEditar, eliminar,}) => {
    const {categoria, nombre, cantidad, fecha, id} = gasto
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
    
    
        const trailingActions = () => (
            <TrailingActions>
                    <SwipeAction onClick={() => eliminar(id)} destructive={true}>
                        Eliminar
                    </SwipeAction>
            </TrailingActions>
        )

  return (
    <SwipeableList>
        <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        >
    <div className='gasto sombra'>
        <div className='contenido-gasto'>
            <img 
            src={diccionarioIconos[categoria]}
            alt='Iconos Gastos'
            />
            <div className='descripcion-gasto'>
                <p className='categoria'>{categoria}</p>
                <p className='nombre-gasto'>{nombre}</p>
                <p className='fecha-gasto'>
                    <span>{formatearFecha(fecha)}</span>
                </p>
            </div>
            </div>
            <p className='cantidad-gasto'>${cantidad}</p>
    </div>
    </SwipeableListItem>
    </SwipeableList>
    
  )
}

export default Gasto