const initialState =[]

export default function store(state = initialState, action){
	switch (action.type) {
		case 'STORE_UPDATE':
			return action.data

		case 'STORE_ADD':
			state.unshift(action.data)
			return state

		case 'STORE_RM':
			return state.filter(item => {
				if (item.id !== action.data.id) {
                    return item
                }
			})
		default:
			return state
	}
}