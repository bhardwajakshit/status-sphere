export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(
      `/api/api?endpoint=${encodeURIComponent(endpoint)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
