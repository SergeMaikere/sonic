import type { AudioPlay, Vec2 } from 'kaplay'
import K from '../kaplayCtx'
import { setText } from '../utils/textArea'
import Score from '../utils/score';

export const gameover = () => {
	const lostSfx = K.play('lost', {volume: 0.3})

	const scoreHandler = new Score(false)
	const bestScore = scoreHandler.bestScore
	const currentScore = scoreHandler.score

	setText('GAME OVER', 96, K.vec2(K.center().x, K.center().y - 300))
	setText(`BEST SCORE : ${bestScore}`, 64, K.vec2(K.center().x - 400, K.center().y - 200))
	setText(`CURRENT SCORE : ${currentScore}`, 64, K.vec2(K.center().x + 400, K.center().y - 200))
	setRankBox(scoreHandler.getRank(bestScore), K.vec2(K.center().x - 400, K.center().y + 50))
	setRankBox(scoreHandler.getRank(currentScore), K.vec2(K.center().x + 400, K.center().y + 50))
	setRetryOption(scoreHandler, lostSfx)
}

const setRankBox = ( rank: string, pos: Vec2) => {
	const bestRankBox = K.add(
		[
			K.rect(400, 400, {radius: 4}),
			K.color(0, 0, 0),
			K.area(),
			K.anchor('center'),
			K.outline(6, K.Color.fromArray([255, 255, 255])),
			K.pos(pos)
		]
	)
	bestRankBox.add(
		[
			K.text(rank, {font: 'mania', size: 100}),
			K.anchor('center')
		]
	)
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
