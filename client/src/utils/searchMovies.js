export default function searchMovies(search, movies) {
  return movies?.filter((movie) => movie.nameEN.includes(search)) ?? [];
}
