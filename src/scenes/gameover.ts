import type { AudioPlay } from 'kaplay'
import K from '../kaplayCtx'
import { setText } from '../utils/textArea'
import Score from '../utils/score';

export const gameover = ( citySfx: AudioPlay ) => {
	citySfx.paused = true;
	const scoreHandler = new Score()
	const bestScore = scoreHandler.bestScore
	const currentScore = scoreHandler.score

	setText('GAME OVER', 96, K.vec2(K.center().x, K.center().y - 300))
	setText(`BEST SCORE : ${bestScore}`, 64, K.vec2(K.center().x - 400, K.center().y - 200))
	setText(`CURRENT SCORE : ${currentScore}`, 64, K.vec2(K.center().x + 400, K.center().y - 200))
	setText('GOGO NIWE !', 96, K.vec2(K.center()))
	setText('Want to try again ?', 64, K.vec2(K.center().x, K.center().y + 100))
	setText('Press space/Click/To try again', 32, K.vec2(K.center().x, K.center().y + 200))

	K.onButtonPress('jump', () => {scoreHandler.score = 0; K.go('main-menu')})
}
