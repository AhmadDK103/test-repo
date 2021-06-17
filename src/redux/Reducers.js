
const istate = {
    item:{},
}
const reducer = (state = istate, action) => {
   if(action.type === 'EDIT-ITEM'){
       console.log(action)
       return{
           ...state,
           item:action.data
       }
   }
   if(action.type === 'Add-ITEM'){
       console.log(action.data)
       return{
           ...state,
           item:action.data
       }
   }
   return state
}
export default reducer