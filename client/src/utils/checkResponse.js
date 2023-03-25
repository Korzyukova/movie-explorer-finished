export default function checkResponse(res) {
  return res.ok ? res.json() : new Error(`Ошибка: ${res.status}`);
}
