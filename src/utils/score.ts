import type { GameObj } from "kaplay"

export default class Score {

	private score: number = 0
	private multiplier: number = 0
	private scoreText: GameObj

	constructor ( scoreText: GameObj ) {
		this.scoreText = scoreText
	}

	updateScore = () => this.scoreText.text = `SCORE: ${this.score}`

	onRebound = () => {
		this.multiplier += 1
		this.score += 10 * this.multiplier 
		this.updateScore()
	}

	onRingCollection = () => {
		this.score++
		this.updateScore()
	}

	onEnemyCollision = () => {
		this.score = 0
		this.updateScore()
	}
}