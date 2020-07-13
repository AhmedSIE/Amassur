
const initialState = { pross:'' }

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
        default:
          return state
    }
}

export default toggleFavorite