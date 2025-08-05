import K from '../kaplayCtx'
import { type GameObj } from 'kaplay'
import { makeSonic } from '../entities/sonic'

interface BgSprites {
	sprite: GameObj[]
	width: number
	posY: number
	scale: number
}

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

export const setBgGameObject = (): BgSprites => {
	let b = { width: 1920, posY: 0, scale: 2}
	const bg = [
		K.add( [K.sprite('chemical-bg'), K.pos(0, 0), K.opacity(0.8), K.scale(b.scale)] ),
		K.add( [K.sprite('chemical-bg'), K.pos(b.width * b.scale, b.posY), K.opacity(0.8), K.scale(b.scale)] ),
	]
	return { ...b, sprite: bg }
}

export const setPlatformGameObject = (): BgSprites => {
	let p = { width: 1280, posY: 450, scale: 4 }
	const platforms = [
		K.add( [K.sprite('platform'), K.pos(0, p.posY), K.scale(p.scale)] ),
		K.add( [K.sprite('platform'), K.pos(p.width * p.scale, p.posY), K.scale(p.scale)] )
	]
	return { ...p, sprite: platforms }
}

export const infiniteTraveling = ( obj: BgSprites, speed: number ) => {
	if ( obj.sprite[1].pos.x < 0 ) return doSwitcharoo(obj)
	doTraveling(obj, speed)
}

const doSwitcharoo = ( obj: BgSprites ) => {
	obj.sprite[0].moveTo( obj.sprite[1].pos.x + obj.width * obj.scale, obj.posY )
	obj.sprite.push(obj.sprite.shift() as GameObj)
}

const doTraveling = ( obj: BgSprites, speed: number ) => {
	obj.sprite[0].move(speed, 0)
	obj.sprite[1].moveTo( obj.sprite[0].pos.x + obj.width * obj.scale, obj.posY )
}

const setMainMenuText = () => {
	K.add( [K.text('SONIC RING RUN', {font: 'mania', size: 32}), K.pos(K.center().x, 200), K.anchor('center')] )
	K.add( [K.text('Press space/Click/Touch to play', {font: 'mania', size: 32}), K.pos(K.center().x, K.center().y - 200), K.anchor('center')] )
}