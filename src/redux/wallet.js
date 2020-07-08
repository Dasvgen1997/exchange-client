export default function(state = [], action) {
	switch (action.type) {
		case 'SET_WALLET':
            return action.payload;
            
        // case 'ADD_WALLET':
        //     let newState = state;
        //     state.forEach((item, i)=>{
        //         if(item._id == action.payload){
        //             let newValute = item;
        //             newValute.amount  =  newValute.amount + 100;
        //             newState.splice(i, 1, newValute);
        //         }
        //     })

        //     console.log(newState);
        //     return newState;
        
		default:
			return state;
	}
}
