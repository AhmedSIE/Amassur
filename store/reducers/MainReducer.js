
const initialState = { pross:'', token:'' }

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'PROCESS_ACTION':          
            nextState = {
              ...state,
              pross: [action.value]
            }
            // console.log(nextState)
            return nextState || state
        case 'PROCESS_TOKEN':          
            nextState = {
              ...state,
              token: [action.value]
            }
            // console.log(nextState)
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite