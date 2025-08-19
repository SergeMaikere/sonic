import type { GameObj } from "kaplay"
import K from '../kaplayCtx'

export default class Score {
	static instance: Score | null = null

	rankGrades: {r: string, v: number}[] = [ 
		{r: 'F', v: 50}, 
		{r: 'E', v: 80}, 
		{r: 'D', v: 100}, 
		{r: 'C', v: 200}, 
		{r: 'B', v: 300}, 
		{r: 'A', v: 400}, 
		{r: 'S', v: 500}
	]

	bestRank: string = 'F'
	rank: string = 'F'

	bestScore: number = 0
	score: number = 0

	multiplier: number = 0
	private scoreText: GameObj = K.add( [K.text("SCORE: 0", {font: 'mania', size: 72}), K.pos(20, 20)] )

	constructor ( ) {
		if ( Score.instance ) return Score.instance
		Score.instance = this
	}

	updateScore = () => {
		this.scoreText.text = `SCORE: ${this.score}`
		if ( this.score > this.bestScore ) this.bestScore = this.score
	}

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
		this.multiplier = 0
		this.updateScore()
	}
}