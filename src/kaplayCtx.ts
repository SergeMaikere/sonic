import kaplay from 'kaplay'

export const K = kaplay( 
    {
        width: 1920, 
        height: 1080, 
        letterbox: true, 
        background: [0, 0, 0],
        touchToMouse: true,
        global: false,
        buttons: {
            jump: {
                keyboard: [ 'space' ],
                mouse: 'left'
            }
        },
        debugKey: 'd',
        debug: true
    } 
)

export default K