function reservationReducer(state = {}, action) {
    switch (action.type) {
        case 'UPDATE_NUMBER_OF_CHILDREN':
            return $.extend(true, {}, state, { numberOfChildren: +action.value })
        default:
            return state
    }
}

export { reservationReducer }
