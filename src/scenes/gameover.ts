import K from '../kaplayCtx'
import { setSceneText } from '../utils/textArea'

export const gameover = () => {

	setSceneText('GAME OVER', 'Press space/Click/Touch to try again')

	K.onButtonPress('jump', () => K.go('main-menu'))
}