import K from './kaplayCtx'
import { game } from './scenes/game'
import { gameover } from './scenes/gameover'
import { mainMenu } from './scenes/mainMenu'

/*----------  Loading all assets  ----------*/

//Sprites
const loadSprites = () => {
	K.loadSprite( 'chemical-bg', 'graphics/chemical-bg.png' )
	K.loadSprite( 'platform', 'graphics/platforms.png' )

	K.loadSprite( 
		'sonic', 
		'graphics/sonic.png', 
		{
			sliceX: 8, 
			sliceY: 2, 
			anims: {
				run: { from: 0, to: 7, loop: true, speed: 30 },
				jump: { from: 8, to: 15, loop: true, speed: 100 }
			}
		} 
	)

	K.loadSprite( 
		'ring', 
		'graphics/ring.png', 
		{
			sliceX: 16, 
			sliceY: 1,
			anims: {
				spin: { from: 0, to: 15, loop: true, speed: 30 }
			}
		} 
	)

	K.loadSprite( 
		'motobug', 
		'graphics/motobug.png', 
		{
			sliceX: 5, 
			sliceY: 1,
			anims: {
				run: { from: 0, to: 4, loop: true, speed: 30 }
			}
		} 
	)
}

//Font
const loadFonts = () => K.loadFont( 'mania', 'fonts/mania.ttf' )

//Sounds
const loadSounds = () => {
	K.loadSound( 'city', 'sounds/city.mp3' )
	K.loadSound( 'Destroy', 'sounds/Destroy.wav' )
	K.loadSound( 'Hurt', 'sounds/Hurt.wav' )
	K.loadSound( 'HyperRing', 'sounds/HyperRing.wav' )
	K.loadSound( 'Jump', 'sounds/Jump.wav' )
	K.loadSound( 'Ring', 'sounds/Ring.wav' )
}

/*----------  Scenes  ----------*/
const loadScenes = () => {
	K.scene( 'main-menu', mainMenu )
	K.scene( 'game', game )
	K.scene( 'gameover', gameover )
	K.go('main-menu')
}


const run = () => {
	loadSprites()
	loadFonts()
	loadSounds()
	loadScenes()
}

run()