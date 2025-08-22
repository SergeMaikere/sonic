import K from '../kaplayCtx'
import { makeSonic } from '../entities/sonic'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject, setSolidPlatform } from '../utils/background'
import { setText } from '../utils/textArea'

export const mainMenu = () => {
	if ( !K.getData('best-score') ) K.setData('best-score', 0)
	K.setData('current-score', 0)

	setBackGround(-4000)
	setText('SONIC RING RUN', 96, K.vec2(K.center().x, 200))
	setText('Press Enter/Click/Touch to play', 64, K.vec2(K.center().x, K.center().y - 200))
	makeSonic(K.vec2(200, 745))
	
	K.onButtonPress('continue', () => K.go('select-player'))
}

const setBackGround = ( gameSpeed: number ) => {
	const bg = setBgGameObject()
	const plat = setPlatformGameObject()
	K.onUpdate(
		() => {
			infiniteTraveling(bg, -100)
			infiniteTraveling(plat, gameSpeed)
		}
	)
	setSolidPlatform()
}