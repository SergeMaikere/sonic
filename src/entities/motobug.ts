import K from '../kaplayCtx'
import type { Vec2 } from 'kaplay'

export const makeMotoBug = ( pos: Vec2 ) => {
	return K.add(
		[
			K.sprite('motobug', {anim: 'run'}),
			K.pos(pos),
			K.area({shape: new K.Rect(K.vec2(-5, 0), 32, 32)}),
			K.anchor('center'),
			K.scale(4),
			K.offscreen(),
			'enemy'
		]
	)
}