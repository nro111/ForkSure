import { createSlice } from '@reduxjs/toolkit';

export const savejobSlice = createSlice({
    name: "savejob",
    initialState: {
        savejob: [],
    },
    reducers:{
        addTosavejob : (state:any,action:any) => {
            const itemInsavejob = state.savejob.find((item:any) => item.id == action.payload.id);
            if(itemInsavejob){
                itemInsavejob.quantity++;
            }else{
                state.savejob.push({...action.payload,quantity:1})
            }
        },
        removeFromsavejob:(state:any,action:any) => {
            const removeFromsavejob = state.savejob.filter((item:any) => item.id !== action.payload);
            state.savejob = removeFromsavejob;
        },
        incrementQuantity : (state:any,action:any) => {
            const itemInsavejob = state.savejob.find((item:any) => item.id == action.payload.id);
            itemInsavejob.quantity++;
        },
        decrementQuantity : (state:any,action:any) => {
            const itemInsavejob = state.savejob.find((item:any) => item.id == action.payload.id);
            if(itemInsavejob.quantity == 1){
                const removeFromsavejob = state.savejob.filter((item:any) => item.id !== action.payload.id);
                state.savejob = removeFromsavejob;
            }else{
                itemInsavejob.quantity--;
            }
        }
    }
});

export const {addTosavejob,removeFromsavejob,incrementQuantity,decrementQuantity} = savejobSlice.actions;

export default savejobSlice.reducer;