export async function getFeedback(content) {
  const response = await fetch(
    `/api/WritingAssistant/GetFeedback?content=${encodeURIComponent(content)}`,
  );

  return response.json();
}
