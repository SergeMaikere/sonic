import type { GameObj } from "kaplay"

export default class Score {
	static instance: Score

	rankGrades: string[] = [ 'F', 'E', 'D', 'C', 'B', 'A', 'S' ]
	rankValues: number[] = [ 50, 80, 100, 200, 300, 400, 500 ]

	bestRank: string = 'F'
	rank: string = 'F'

	bestScore: number = 0
	score: number = 0

	multiplier: number = 0
	private scoreText!: GameObj

	constructor ( scoreText: GameObj ) {
		if ( Score.instance ) return Score.instance
		Score.instance = this
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