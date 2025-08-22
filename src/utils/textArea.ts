import type { Vec2 } from 'kaplay'
import K from '../kaplayCtx'

export const setText = ( str: string, size: number, pos: Vec2 ) => {
	return K.add( [K.text(str, {font: 'mania', size}), K.pos(pos), K.anchor('center')] )
} 

export const setTextBox = ( text: string, pos: Vec2, size: number) => {
	const textBox = K.add(
		[
			K.rect(400, 400, {radius: 4}),
			K.color(0, 0, 0),
			K.area(),
			K.anchor('center'),
			K.outline(6, K.Color.fromArray([255, 255, 255])),
			K.pos(pos),
			{
				getText () { return text }
			}
		]
	)
	textBox.add(
		[
			K.text(text, {font: 'mania', size}),
			K.anchor('center')
		]
	)
	return textBox
}