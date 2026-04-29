export async function getFeedback(content) {
  const response = await fetch(
    `/api/WritingAssistant/GetFeedback?content=${encodeURIComponent(content)}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function generateTitles(title, content) {
  const queryParams = new URLSearchParams({
    title,
    content,
  });

  const response = await fetch(
    `/api/WritingAssistant/GenerateTitles?${queryParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
