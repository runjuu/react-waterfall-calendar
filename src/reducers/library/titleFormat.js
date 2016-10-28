export default function titleFormat(
  state = 'YYYY-MM-DD',
  action) {
  switch (action.type) {
    case 'TITLE_FORMAT':
      return action.format;
    default:
      return state;
  }
}
