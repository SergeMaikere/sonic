import K from '../kaplayCtx'
import { makeSonic } from '../entities/sonic'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject, setSolidPlatform } from '../utils/background'
import { setSceneText } from '../utils/textArea'

export const mainMenu = () => {
	if ( !K.getData('best-score') ) K.setData('best-score', 0)

	setBackGround(-4000)
	setSceneText('SONIC RING RUN', 'Press space/Click/Touch to play')
	makeSonic(K.vec2(200, 745))
	
	K.onButtonPress('jump', () => K.go('game'))
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