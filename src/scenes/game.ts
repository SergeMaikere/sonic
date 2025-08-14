import K from '../kaplayCtx'
import { makeMotoBug } from '../entities/motobug'
import { makeSonic } from '../entities/sonic'
import { makeRing } from '../entities/ring'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject } from './mainMenu'
import type { GameObj } from 'kaplay'

export const game = () => {
	K.setGravity(3100)

	let gameSpeed = -300
	K.loop( 1, () => gameSpeed -= 50 )

	const setInfiniteTraveling = () => {
		const bg = setBgGameObject()
		const plat = setPlatformGameObject()
		K.onUpdate(
			() => {
				infiniteTraveling(bg, -100)
				infiniteTraveling(plat, gameSpeed)
			}
		)
	}

	const spawn = ( makeEntity: Function, pos: {x: number, y: number}, rand: {min: number, max: number} ) => {
		const mySpawn = () => {
			const entity = makeEntity(K.vec2(pos.x, pos.y))
			entity.onUpdate(
				() => {
					if ( gameSpeed > -2000 ) {
						entity.move(gameSpeed - 300, 0)
						return
					}

					if ( gameSpeed < -2000 ) {
						entity.move( gameSpeed, 0)
					}
				}
			)

			entity.onExitScreen( () => entity.pos.x < 0 && K.destroy(entity) )
			const waitTime = K.rand(rand.min, rand.max)
			K.wait( waitTime, mySpawn )
		}
		mySpawn()
	}


	setInfiniteTraveling()
	spawn( makeMotoBug, {x: 1950, y: 775}, {min: 0.5, max: 2.5} ) 
	spawn( makeRing, {x: 1950, y: 765}, {min: 0.5, max: 3} ) 
	setSolidPlatform()
	setSonic()
}

const setSolidPlatform = () => K.add( [K.rect(1920, 300), K.pos(0, 832), K.area(), K.body({isStatic: true}), K.opacity(0)] )

const setSonic = () => {
	const sonic =  makeSonic(K.vec2(200, 745))
	sonic.setControls()
	sonic.setEvent()
	sonic.onCollide( 'enemy', (enemy: GameObj) => setEnemyCollision(sonic, enemy) )
	sonic.onCollide( 'ring', (ring: GameObj) => setRingCollision(ring) )
}

const setEnemyCollision = ( sonic: GameObj, enemy: GameObj ) => {
	if ( !sonic.isGrounded() ) return rebound(sonic, enemy)
	gameover()
}

const rebound = ( sonic: GameObj, enemy: GameObj ) => {
	sonic.play('jump')
	sonic.jump()
	K.play( 'Destroy', {volume: 0.5} )
	K.play( 'HyperRing', {volume: 0.5} )
	K.destroy(enemy)
}

const gameover = () => {
	K.play('Hurt', {volume: 0.5})
	K.go('gameover')
}

const setRingCollision = ( ring: GameObj ) => {
	K.play('Ring', {volume: 0.5})
	K.destroy(ring)
}