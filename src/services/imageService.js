export async function fetchImage(imageData, imageFormat, imageType) {
  try {
    const response = await fetch("/api/image/modified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageData,
        imageFormat,
        imageType,
      }),
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error(err);
  }
}
