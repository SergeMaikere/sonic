import K from '../kaplayCtx'
import type { Vec2 } from 'kaplay'

export const makeRing = ( pos:  Vec2 ) => {
	return K.add(
		[
			K.sprite( 'ring', {anim: 'spin'} ),
			K.pos(pos),
			K.scale(4),
			K.anchor( 'center' ),	
			K.area(),
			K.offscreen(),
			'ring'
		]
	)
}