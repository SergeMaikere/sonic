import type { GameObj } from "kaplay"
import K from '../kaplayCtx'

export default class Score {

	rankGrades: {rank: string, value: number}[] = [ 
		{rank: 'F', value: 50}, 
		{rank: 'E', value: 80}, 
		{rank: 'D', value: 100}, 
		{rank: 'C', value: 200}, 
		{rank: 'B', value: 300}, 
		{rank: 'A', value: 400}, 
		{rank: 'S', value: 500}
	]

	bestScore: number = K.getData('best-score') || 0
	score: number = 0
	multiplier: number = 0

	private isGame: boolean = true
	private scoreText: GameObj | null = null

	constructor ( isGame: boolean ) {
		this.isGame = isGame
		this.scoreText = this.isGame ? this.setsCoreText() : null
		this.score = this.isGame ? 0 : K.getData('current-score') || 0
	}

	private setsCoreText = () => K.add( [K.text("SCORE: 0", {font: 'mania', size: 72}), K.pos(20, 20)] )

	
	getRank ( score: number ) {
		return this.rankGrades.filter( rg => rg.value >= score )[0].rank || 'S'
	}

	updateScore = () => {
		this.scoreText!.text = `SCORE: ${this.score}`
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

	setBestScore = () => {
		if ( this.score < this.bestScore ) return
		K.setData('best-score', this.score)
	}

	setCurrentScore = () => K.setData('current-score', this.score)
}