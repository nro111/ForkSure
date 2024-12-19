import { StackActions, DrawerActions, CommonActions, DrawerActionType, StackActionType  } from '@react-navigation/native'

let _navigator: { dispatch: (arg0: CommonActions.Action | StackActionType | DrawerActionType) => void }

function setTopLevelNavigator(r: { dispatch: (arg0: CommonActions.Action | StackActionType | DrawerActionType) => void }) {
  _navigator = r
}

function navigate(routeName: any, params: any) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params : params
    })
  )
}

function replace(routeName: any, params: any) {
  _navigator.dispatch(
    StackActions.replace({
      name: routeName,
      params : params
    } as any)
  )
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer())
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer())
}

function back() {
  _navigator.dispatch(CommonActions.goBack())
}


export default {
  navigate,
  setTopLevelNavigator,
  openDrawer,
  closeDrawer,
  back,
  replace
}