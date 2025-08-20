import type { Vec2 } from 'kaplay'
import K from '../kaplayCtx'

export const setSceneText = ( title: string, subtitle: string, size: number ) => {
	K.add( [K.text(title, {font: 'mania', size: 32}), K.pos(K.center().x, 200), K.anchor('center')] )
	K.add( [K.text(subtitle, {font: 'mania', size: 32}), K.pos(K.center().x, K.center().y - 200), K.anchor('center')] )
}

export const setText = ( str: string, size: number, pos: Vec2 ) => {
	return K.add( [K.text(str, {font: 'mania', size}), K.pos(pos), K.anchor('center')] )
} 