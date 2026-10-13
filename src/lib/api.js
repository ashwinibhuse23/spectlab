const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const getApiUrl = (endpoint) => {
  // If running in browser and NOT localhost, but API_BASE_URL points to localhost, use relative path
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    API_BASE_URL.includes('localhost')
  ) {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }

  if (API_BASE_URL) {
    // Trim trailing slash from base url and leading slash from endpoint
    const base = API_BASE_URL.replace(/\/+$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
  }
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
};

export async function sendContactEmail(formData) {
  try {
    const url = getApiUrl('/api/contact');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type') || '';
    let data = {};

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Backend API endpoint not found (404). Please ensure the server is running.'
            : `Server returned error (${response.status}): ${text.slice(0, 120)}`
        );
      }
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send contact inquiry');
    }
    return { success: true, data };
  } catch (error) {
    console.error('Contact email error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendAppointmentEmail(formData) {
  try {
    const url = getApiUrl('/api/appointment');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get('content-type') || '';
    let data = {};

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Backend API endpoint not found (404). Please ensure the backend server is running.'
            : `Server returned error (${response.status}): ${text.slice(0, 120)}`
        );
      }
    }

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit appointment request');
    }
    return { success: true, data };
  } catch (error) {
    console.error('Appointment email error:', error);
    return { success: false, error: error.message };
  }
}

