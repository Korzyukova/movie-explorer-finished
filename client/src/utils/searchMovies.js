export default function searchMovies(search, movies) {
  return [...movies].filter((movie) => movie.nameEN
    .toLowerCase()
    .includes(search.toLowerCase())) ?? [];
}
