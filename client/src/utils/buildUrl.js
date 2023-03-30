export default () => {
  const { hostname } = window.location;
  const ext = hostname === 'localhost' ? `:${window.location.port}` : '/api';
  return `${window.location.protocol}//${window.location.hostname}${ext}`;
};
