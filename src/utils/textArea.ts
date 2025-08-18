import K from '../kaplayCtx'

export const setSceneText = ( title: string, subtitle: string ) => {
	K.add( [K.text(title, {font: 'mania', size: 32}), K.pos(K.center().x, 200), K.anchor('center')] )
	K.add( [K.text(subtitle, {font: 'mania', size: 32}), K.pos(K.center().x, K.center().y - 200), K.anchor('center')] )
}