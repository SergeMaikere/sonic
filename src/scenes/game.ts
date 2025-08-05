import { makeSonic } from '../entities/sonic'
import K from '../kaplayCtx'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject } from './mainMenu'

export const game = () => {
	K.setGravity(3100)
	setBackground()
	setSolidPlatform()
	setSonic()
}

const setBackground = () => {
	let gameSpeed = -300
	K.loop( 1, () => gameSpeed -= 50 )

	const bg = setBgGameObject()
	const plat = setPlatformGameObject()
	K.onUpdate(
		() => {
			infiniteTraveling(bg, -100)
			infiniteTraveling(plat, gameSpeed)
		}
	)
}

const setSolidPlatform = () => K.add( [K.rect(1920, 300), K.pos(0, 832), K.area(), K.body({isStatic: true}), K.opacity(0)] )

const setSonic = () => {
	const sonic =  makeSonic(K.vec2(200, 745))
	sonic.setControls()
	sonic.setEvent()
}