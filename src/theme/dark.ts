import { invertColor } from '../utils'
import light from './light'

const { primaryBgColor } = light

const primaryColor = 'rgba(255, 255, 255, 0.65)'
const pureLight = '#ffffff'
const pureSameColor = '#000000'

export default {
    secondaryColor: '',
    moonSun: '#b1d5c8',
    backgroundColor: '#141414',
    pureSameColor,
    color: pureLight,
    primaryColor: primaryColor,
    primaryTextColor: primaryColor,
    primaryBgColor: invertColor(primaryBgColor),
}
