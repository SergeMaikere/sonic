import K from '../kaplayCtx'
import type { Vec2 } from 'kaplay'

export const makeSonic = ( pos: Vec2 ) => {
	return K.add( 
		[
			K.sprite('sonic', {anim: 'run'}),
			K.scale(4),
			K.pos(pos),
			K.anchor('center'),
			K.area(),
			K.body( {jumpForce: 1400} ),
			{
				setControls () { K.onButtonPress('jump', () => jump(this)) }, 
				setEvent () { (this as any).onGround(() => (this as any).play('run')) },
				ringCollectUI: null
			}
		] 
	)
}

const jump = (ctx: any) => {
	if ( !ctx.isGrounded() ) return
	ctx.play('jump')
	ctx.jump()
	K.play( 'Jump', {volume: 0.5} )
}

