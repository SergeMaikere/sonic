import kaplay, { type GameObj } from 'kaplay'

const k = kaplay(
    {
        width: 1280,
        height: 720
    }
)

k.loadBean()
k.setGravity(2000)
let counter = 0

const counterUI = k.add( [k.text(counter.toString())] )
const player = k.add( [k.sprite('bean'), k.pos(k.center()), k.area(), k.body(), k.offscreen()] )

const jump = (charachter: GameObj) => () => charachter.isGrounded() && charachter.jump()

player.onKeyPress('space', jump(player))
player.onExitScreen( () => k.go('gameover') )

k.add( [k.rect(k.width(), 300), k.pos(0,500), k.area(), k.body({isStatic: true}), k.outline(3)] )

k.scene( 'gameover', () => k.add([k.text('GAME OVER'), k.pos(k.center())]) )

const incrementCounter = () => {
    counter++
    counterUI.text = counter.toString()
}

const getSpeed = () => {
    const speeds = [ 200, 500, 800, 1000, 1200 ]
    return speeds[ Math.floor(Math.random() * speeds.length) ]
}

k.loop( 
    1, 
    () => {
        incrementCounter()

        k.add(
            [

                k.rect(50, 50), 
                k.pos(1000, 500), 
                k.area(), 
                k.body(), 
                k.outline(), 
                k.move( k.vec2(-1, 0), getSpeed() )
            ]
        ) 
    }
)
