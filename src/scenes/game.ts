import K from '../kaplayCtx'
import { makeMotoBug } from '../entities/motobug'
import { makeSonic } from '../entities/sonic'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject } from './mainMenu'

export const game = () => {
	K.setGravity(3100)

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

	setSolidPlatform()
	setSonic()
	
	const spawnMotobug = () => {
		const motobug = makeMotoBug(K.vec2(1950, 775))
		motobug.onUpdate(
			() => {
				if ( gameSpeed > -2000 ) {
					motobug.move(gameSpeed - 300, 0)
					return
				}

				if ( gameSpeed < -2000 ) {
					motobug.move( gameSpeed, 0)
				}
			}
		)

		motobug.onExitScreen( () => motobug.pos.x < 0 && K.destroy(motobug) )

		const waitTime = K.rand(0.5, 2.5)
		K.wait( waitTime, spawnMotobug )
	}
	spawnMotobug()
}

const setSolidPlatform = () => K.add( [K.rect(1920, 300), K.pos(0, 832), K.area(), K.body({isStatic: true}), K.opacity(0)] )

const setSonic = () => {
	const sonic =  makeSonic(K.vec2(200, 745))
	sonic.setControls()
	sonic.setEvent()
}
