import K from '../kaplayCtx'
import type { GameObj } from 'kaplay'
import { makeMotoBug } from '../entities/motobug'
import { makeSonic } from '../entities/sonic'
import { makeRing } from '../entities/ring'
import { infiniteTraveling, setBgGameObject, setPlatformGameObject } from './mainMenu'


class Score {

	private score: number = 0
	private multiplier: number = 0
	private scoreText: GameObj

	constructor ( scoreText: GameObj ) {
		this.scoreText = scoreText
	}

	updateScore = () => this.scoreText.text = `SCORE: ${this.score}`

	onRebound = () => {
		this.multiplier += 1
		this.score += 10 * this.multiplier 
		this.updateScore()
	}

	onRingCollection = () => {
		this.score++
		this.updateScore()
	}

	onEnemyCollision = () => {
		this.score = 0
		this.updateScore()
	}

}

export const game = () => {
	K.setGravity(3100)

	let gameSpeed = -300
	K.loop( 1, () => gameSpeed -= 50 )

	const scoreText = K.add( [K.text("SCORE: 0", {font: 'mania', size: 72}), K.pos(20, 20)] )
	const scoreHandler = new Score(scoreText)

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
	setSonic( scoreHandler)
}

const setSolidPlatform = () => K.add( [K.rect(1920, 300), K.pos(0, 832), K.area(), K.body({isStatic: true}), K.opacity(0)] )

const setSonic = ( scoreHandler: Score ) => {
	const sonic =  makeSonic(K.vec2(200, 745))
	sonic.setControls()
	sonic.setEvent()
	sonic.onCollide( 'enemy', (enemy: GameObj) => setEnemyCollision(sonic, enemy, scoreHandler) )
	sonic.onCollide( 'ring', (ring: GameObj) => setRingCollision(ring, scoreHandler) )
}

const setEnemyCollision = ( sonic: GameObj, enemy: GameObj, scoreHandler: Score ) => {
	if ( !sonic.isGrounded() ) return rebound(sonic, enemy, scoreHandler)
	gameover(scoreHandler)
}

const rebound = ( sonic: GameObj, enemy: GameObj, scoreHandler: Score ) => {
	sonic.play('jump')
	sonic.jump()
	K.play( 'Destroy', {volume: 0.5} )
	K.play( 'HyperRing', {volume: 0.5} )
	K.destroy(enemy)
	scoreHandler.onRebound()
}

const gameover = ( scoreHandler: Score ) => {
	K.play('Hurt', {volume: 0.5})
	scoreHandler.onEnemyCollision()
	K.go('gameover')
}

const setRingCollision = ( ring: GameObj, scoreHandler: Score ) => {
	K.play('Ring', {volume: 0.5})
	K.destroy(ring)
	scoreHandler.onRingCollection()
}