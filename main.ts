class Position {
    constructor(public x: number, public y: number) {
    }

    can_drop(state: State): boolean {
        
        if (current.y == 4) {
            return false
        }

        for (let position of state) {
            if (position.x == current.x
             && position.y == current.y + 1) {
                return false
            }
        }

        return true
    }
}

type State = Array<Position>

let state: State = []

let current: Position = new Position(2, 0)

control.setInterval(() => {
    led.unplot(current.x, current.y)

    if (current.can_drop(state)) {
        current.y = Math.clamp(0, 4, current.y + 1)
    }
    else {
        state.push(current)
        current = new Position(2, 0)
    }

}, 1000, control.IntervalMode.Interval)

basic.forever(() => {

    for (let pos of state)
        led.plot(pos.x, pos.y)

    led.plot(current.x, current.y)
})


input.onButtonPressed(Button.A, () => {
    led.unplot(current.x, current.y)
    current.x = Math.clamp(0, 4, current.x - 1) // move left
})

input.onButtonPressed(Button.B, () => {
    led.unplot(current.x, current.y)
    current.x = Math.clamp(0, 4, current.x + 1) // move right
})
