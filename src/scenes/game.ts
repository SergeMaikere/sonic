import K from '../kaplayCtx'
import type { AudioPlay, GameObj } from 'kaplay'
import { makeMotoBug } from '../entities/motobug'
import { makeSonic } from '../entities/sonic'
import { makeRing } from '../entities/ring'
import Background, { setSolidPlatform } from '../utils/background'
import Score from '../utils/score'

export const game = () => {
	const citySfx = K.play('city', {volume: 0.2})

	const backgroundHandler = new Background(3100)
	backgroundHandler.setSpeedVariation(50)
	backgroundHandler.setInfiniteTraveling()
	backgroundHandler.spawnEntity( makeMotoBug, {x: 1950, y: 775}, {min: 0.5, max: 2.5} ) 
	backgroundHandler.spawnEntity( makeRing, {x: 1950, y: 765}, {min: 0.5, max: 3} ) 
		
	setSolidPlatform()
	setSonic(new Score(true), citySfx)
}

const setSonic = ( scoreHandler: Score, citySfx: AudioPlay ) => {
	const sonic =  makeSonic(K.vec2(200, 745))
	sonic.setControls()
	sonic.setEvent()
	setRingCollectionUI(sonic)
	sonic.onCollide( 'enemy', (enemy: GameObj) => setEnemyCollision(sonic, enemy, scoreHandler, citySfx) )
	sonic.onCollide( 'ring', (ring: GameObj) => setRingCollision(sonic, ring, scoreHandler) )
}

const setRingCollectionUI = ( sonic: GameObj ) => {
	sonic.ringCollectUI = sonic.add(
		[
			K.anchor('center'),
			K.pos(30, -10),
			K.text('', {font: 'mania', size: 12}),
			K.color(255, 255, 0)
		]
	)
}

const setEnemyCollision = ( sonic: GameObj, enemy: GameObj, scoreHandler: Score, citySfx: AudioPlay ) => {
	if ( !sonic.isGrounded() ) return rebound(sonic, enemy, scoreHandler)
	gameover(scoreHandler, citySfx)
}

const rebound = ( sonic: GameObj, enemy: GameObj, scoreHandler: Score ) => {
	sonic.play('jump')
	sonic.jump()
	K.play( 'Destroy', {volume: 0.5} )
	K.play( 'HyperRing', {volume: 0.5} )
	K.destroy(enemy)
	scoreHandler.onRebound()
	if ( scoreHandler.multiplier === 1 ) return displayRingCollectUI(sonic, '+10')
	displayRingCollectUI(sonic, `X${scoreHandler.multiplier}`)
}

const gameover = ( scoreHandler: Score, citySfx: AudioPlay ) => {
	K.play('Hurt', {volume: 0.5})
	scoreHandler.onEnemyCollision()
	scoreHandler.setBestScore()
	scoreHandler.setCurrentScore()
	citySfx.stop()
	K.go('gameover', {citySfx})
}

const setRingCollision = ( sonic: GameObj, ring: GameObj, scoreHandler: Score ) => {
	K.play('Ring', {volume: 0.5})
	K.destroy(ring)
	scoreHandler.onRingCollection()
	displayRingCollectUI(sonic, '+1')
}

const displayRingCollectUI = ( sonic: GameObj, gain: string ) => {
	sonic.ringCollectUI.text = gain
	K.wait( 1, () => sonic.ringCollectUI.text = '' )
}
