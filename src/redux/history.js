export default function(state = [], action) {
	switch (action.type) {
		case 'SET_HISTORY':
            return action.payload;
        
		default:
			return state;
	}
}
