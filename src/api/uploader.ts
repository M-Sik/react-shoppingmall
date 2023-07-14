export async function uploadImage(file: File) {
  const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
  const data = new FormData();
  data.append('file', file);
  if (preset !== undefined) {
    data.append('upload_preset', preset);
  }

  const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL;

  if (uploadUrl !== undefined) {
    return fetch(uploadUrl, { method: 'POST', body: data })
      .then((res) => res.json())
      .then((data) => data.url);
  }
}
