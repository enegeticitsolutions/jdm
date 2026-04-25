export async function getCSRFToken() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/csrf/`, {
    credentials: 'include', // important: sets the CSRF cookie in browser
  });
}
