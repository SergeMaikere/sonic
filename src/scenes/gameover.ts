import type { AudioPlay } from 'kaplay'
import K from '../kaplayCtx'
import { setText, setTextBox } from '../utils/textArea'
import Score from '../utils/score';

export const gameover = () => {
	const lostSfx = K.play('lost', {volume: 0.3})

	const scoreHandler = new Score(false)
	const bestScore = scoreHandler.bestScore
	const currentScore = scoreHandler.score
	const bestPlayer =  scoreHandler.bestPlayer
	const currentPlayer = K.getData('current-player')

	setText('GAME OVER', 96, K.vec2(K.center().x, K.center().y - 300))
	setText(`${bestPlayer} : ${bestScore}`, 64, K.vec2(K.center().x - 400, K.center().y - 200))
	setText(`${currentPlayer} : ${currentScore}`, 64, K.vec2(K.center().x + 400, K.center().y - 200))
	setTextBox(scoreHandler.getRank(bestScore), K.vec2(K.center().x - 400, K.center().y + 50), 100)
	setTextBox(scoreHandler.getRank(currentScore), K.vec2(K.center().x + 400, K.center().y + 50), 100)
	setRetryOption(scoreHandler, lostSfx)
}

const setRetryOption = ( scoreHandler: Score, sfx: AudioPlay ) => {
	K.wait( 1, () => setText('Press Enter/Click/Touch to play', 32, K.vec2(K.center().x, K.center().y + 350)) )
	K.onButtonPress(
		'continue', 
		() => {
			scoreHandler.score = 0
			sfx.stop()
			K.go('main-menu')
		}
	)
}
