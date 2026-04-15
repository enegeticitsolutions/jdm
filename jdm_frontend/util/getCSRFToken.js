export async function getCSRFToken() {
  await fetch('http://localhost:8000/api/v1/csrf/', {
    credentials: 'include', // important: sets the CSRF cookie in browser
  });
}
