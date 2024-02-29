export const getBlobImage = async (imageUrl) => {
  return await fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      return blob
    })
}