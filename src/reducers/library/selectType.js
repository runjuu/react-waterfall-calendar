export default function selectType(
  state = 'single',
  action) {
  switch (action.type) {
    case 'SET_SELECT_TYPE':
      return action.theType;
    default:
      break;
  }
  return state;
}
