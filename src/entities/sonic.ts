import K from '../kaplayCtx'
import type { Vec2 } from 'kaplay'

export const makeSonic = ( pos: Vec2 ) => {
	K.add( 
		[
			K.sprite('sonic', {anim: 'run'}),
			K.scale(4),
			K.area(),
			K.anchor('center'),
			K.pos(pos)
		] 
	)
}