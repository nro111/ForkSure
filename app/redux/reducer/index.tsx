import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';
import cartReducer from './cartReducer';
import savejobReducer from './savejobReducer';
import  userSlice from './user';

const rootReducer = combineReducers({
    drawer: drawerReducer,
    cart: cartReducer,
    savejob : savejobReducer,
    user : userSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;