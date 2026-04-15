import Cookies from 'js-cookie';

export async function uploadApplication(formData) {
  const csrfToken = Cookies.get('csrftoken');

  const res = await fetch('http://localhost:8000/api/v1/job-apply/', {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken || '', // Add CSRF token to header
    },
    body: formData, // Must be FormData, NOT JSON
    credentials: 'include', // This includes the CSRF cookie in the request
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Upload failed: ${error}`);
  }

  return res.json();
}
