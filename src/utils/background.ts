import type { GameObj } from "kaplay"
import K from "../kaplayCtx"

interface BgSprites {
	sprite: GameObj[]
	width: number
	posY: number
	scale: number
}

export default class Background {

	private gravity: number = 0
	private gameSpeed: number = -300
	private background: BgSprites = setBgGameObject()
	private platform: BgSprites = setPlatformGameObject()

	constructor ( gravity: number ) {
		this.gravity = this.setGravity(gravity)
	}

	private setGravity = ( gravity: number ) => {
		K.setGravity(gravity)
		return gravity
	}

	setSpeedVariation = ( variation: number ) => K.loop(1, () => this.gameSpeed -= variation)

	setInfiniteTraveling = () => {
		K.onUpdate(
			() => {
				infiniteTraveling(this.background, -100)
				infiniteTraveling(this.platform, this.gameSpeed)
			}
		)
	}

	spawnEntity = ( makeEntity: Function, pos: {x: number, y: number}, rand: {min: number, max: number} ) => {
		const mySpawn = () => {
			const entity = makeEntity(K.vec2(pos.x, pos.y))
			entity.onUpdate(
				() => {
					if ( this.gameSpeed > -2000 ) {
						entity.move(this.gameSpeed - 300, 0)
						return
					}

					if ( this.gameSpeed < -2000 ) {
						entity.move( this.gameSpeed, 0)
					}
				}
			)

			entity.onExitScreen( () => entity.pos.x < 0 && K.destroy(entity) )
			const waitTime = K.rand(rand.min, rand.max)
			K.wait( waitTime, mySpawn )
		}
		mySpawn()
	}
} 

export const setSolidPlatform = () => K.add( [K.rect(1920, 300), K.pos(0, 832), K.area(), K.body({isStatic: true}), K.opacity(0)] )

export const infiniteTraveling = ( obj: BgSprites, speed: number ) => {
	if ( obj.sprite[1].pos.x < 0 ) return doSwitcharoo(obj)
	doTraveling(obj, speed)
}

export const doSwitcharoo = ( obj: BgSprites ) => {
	obj.sprite[0].moveTo( obj.sprite[1].pos.x + obj.width * obj.scale, obj.posY )
	obj.sprite.push(obj.sprite.shift() as GameObj)
}

export const doTraveling = ( obj: BgSprites, speed: number ) => {
	obj.sprite[0].move(speed, 0)
	obj.sprite[1].moveTo( obj.sprite[0].pos.x + obj.width * obj.scale, obj.posY )
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