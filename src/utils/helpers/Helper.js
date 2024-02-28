export const getFileExtension = (file) => {
  let regex = new RegExp("[^.]+$");
  return file.name.match(regex)[0].toLowerCase();
};
export const getChapterId = (text) => {
  text = text.toLowerCase();
  text = text.trim();
  text = text.replace(/ /g, "_");
  return text;
};
