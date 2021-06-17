export const AddAction = (item)=>{
    console.log(item)
   return{
      type:'Add-ITEM',
      data:item,
   }
}

 export const DeleteAction = (item)=>{

     console.log(item)
    return{
       type:'DELETE-ITEM',
       data:item,
    }
 }
export const EditAction = (item)=>{
    console.log(item)
    return{
       type:'EDIT-ITEM',
       data:item
    }
 }
