import K from '../kaplayCtx'
import type { GameObj } from 'kaplay'
import { setText, setTextBox } from '../utils/textArea'
import { isEven, setOnClick } from '../utils/helper'

export const selectPlayer = () => {
	const tag = 'players'
	setText('Select Player', 96, K.vec2(K.center().x, K.center().y - 300))
	let players = setTextBoxPlayers(['ISANGO', 'NIWE'], 400)
	setTag(tag, players)
	setOnClick(tag, select)
}

const setTag = ( tag: string, playaz: GameObj[] ) => playaz.forEach( playa => playa.tag(tag) )

const select = ( player: GameObj ) => {
	K.setData('current-player', player.getText())
	K.go('game')
}

const setTextBoxPlayers = ( names: string[], x: number ) => {
	return names.map(
		( name, i ) => {
			return setTextBox(name, K.vec2(K.center().x + (isEven(i) ? - x : x), K.center().y + 100), 64)
		}
	)
}
