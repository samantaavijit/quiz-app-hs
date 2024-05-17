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
export const BUCKET_DOMAIN =
  "https://firebasestorage.googleapis.com/v0/b/avijitsamanta-class12.appspot.com/o/";
