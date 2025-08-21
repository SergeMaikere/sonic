import type { Vec2 } from 'kaplay'
import K from '../kaplayCtx'

export const setText = ( str: string, size: number, pos: Vec2 ) => {
	return K.add( [K.text(str, {font: 'mania', size}), K.pos(pos), K.anchor('center')] )
} 