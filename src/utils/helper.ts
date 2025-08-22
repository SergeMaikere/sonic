import K from '../kaplayCtx'
import type { GameObj } from 'kaplay'

type Handler = (a: GameObj<any>) => void

export const setOnClick = ( target: string, handler: Handler ) => K.onClick(target, handler)

export const setOnHover = ( target: string, handler: Handler ) => K.onHover(target, handler)
export const setOnHoverUpdate = ( target: string, handler: Handler ) => K.onHoverUpdate(target, handler)
export const setOnHoverEnd = ( target: string, handler: Handler ) => K.onHoverEnd(target, handler)

export const isEven = ( n: number ) => n % 2 === 0