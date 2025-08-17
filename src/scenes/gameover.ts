import K from '../kaplayCtx'

export const gameover = () => {

	K.add( [K.text('GAME OVER', {font: 'mania', size: 72}), K.anchor('center'), K.pos(K.center()) ] )
	K.add( 
		[
			K.text('Try again ?', {font: 'mania', size: 32}), 
			K.anchor('center'), 
			K.pos(K.center().x, K.center().y + 150)
		] 
	)
}