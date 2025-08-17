import K from '../kaplayCtx'
import { makeSonic } from '../entities/sonic'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject } from '../utils/background'

export const mainMenu = () => {
	if ( !K.getData('best-score') ) K.setData('best-score', 0)

	setBackGround(-4000)
	setMainMenuText()
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
}

const setMainMenuText = () => {
	K.add( [K.text('SONIC RING RUN', {font: 'mania', size: 32}), K.pos(K.center().x, 200), K.anchor('center')] )
	K.add( [K.text('Press space/Click/Touch to play', {font: 'mania', size: 32}), K.pos(K.center().x, K.center().y - 200), K.anchor('center')] )
}