import MainApi from './MainApi';

export default async () => {
  try {
    const auth = await MainApi.checkAuth();
    return auth.auth ?? false;
  } catch {
    return false;
  }
};
