import accelerometer from './accelerometer'
import camera from './camera'
import control from './control'
import gps from './gps'
import led from './led'
import proximity from './proximity'
import thermometer from './thermometer'

const controller = Object.assign({},
    accelerometer,
    camera,
    control,
    gps,
    led,
    proximity,
    thermometer)
export default controller
