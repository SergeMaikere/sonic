import K from '../kaplayCtx'
import type { GameObj } from 'kaplay'
import { makeMotoBug } from '../entities/motobug'
import { makeSonic } from '../entities/sonic'
import { makeRing } from '../entities/ring'
import Background, { setSolidPlatform } from '../utils/background'
import Score from '../utils/score'

export const game = () => {

	const backgroundHandler = new Background(3100)
	backgroundHandler.setSpeedVariation(50)
	backgroundHandler.setInfiniteTraveling()
	backgroundHandler.spawnEntity( makeMotoBug, {x: 1950, y: 775}, {min: 0.5, max: 2.5} ) 
	backgroundHandler.spawnEntity( makeRing, {x: 1950, y: 765}, {min: 0.5, max: 3} ) 
	
	const scoreText = K.add( [K.text("SCORE: 0", {font: 'mania', size: 72}), K.pos(20, 20)] )
	const scoreHandler = new Score(scoreText)
	
	setSolidPlatform()
	setSonic(scoreHandler)
}

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