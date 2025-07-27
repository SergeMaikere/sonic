import type { GameObj } from 'kaplay'
import K from '../kaplayCtx'

export const mainMenu = () => {
	if ( !K.getData('best-score') ) K.setData('best-score', 0)
	K.onButtonPress('jump', () => K.go('game'))

	const BG_WIDTH = 1920
	const bg = [
		K.add( [K.sprite('chemical-bg'), K.pos(0, 0), K.opacity(0.8), K.scale(2)] ),
		K.add( [K.sprite('chemical-bg'), K.pos(BG_WIDTH, 0), K.opacity(0.8), K.scale(2)] ),
	]

	const PLATFORM_WIDTH = 1280
	const platforms = [
		K.add( [K.sprite('platform'), K.pos(0, 450), K.scale(4)] ),
		K.add( [K.sprite('platform'), K.pos(PLATFORM_WIDTH * 4, 450), K.scale(4)] )
	]

	K.onUpdate(infiniteTraveling(bg, BG_WIDTH, 2, -100))
	K.onUpdate(infiniteTraveling(platforms, PLATFORM_WIDTH, 4, -4000))
}

const infiniteTraveling = ( bg: GameObj[], width: number, scale: number, speed: number ) => {
	return () => {
		if ( bg[1].pos.x < 0 ) return doSwitcharoo(bg, width, scale)
		doTraveling(bg, width, scale, speed)
	}
}

const doSwitcharoo = ( bg: GameObj[], width: number, scale: number ) => {
	bg[0].moveTo( bg[1].pos.x + width * scale, 0 )
	bg.push(bg.shift() as GameObj)
}

const doTraveling = ( bg: GameObj[], width: number, scale: number, speed: number ) => {
	bg[0].move(speed, 0)
	bg[1].moveTo( bg[0].pos.x + width * scale, 0 )
}