import React from "react";
import EXIF from "exif-js";
import Diary from "../entity/Diary"

function ImageMeta(props) {

  function createDiary(filename, description, dateTime, src) {
    console.log('filename: ' + filename);
    console.log('description: ' + description);
    console.log('dateTime: ' + dateTime);
    const diary = new Diary('image', filename, description, dateTime, src);
    props.collection.push(diary);
    props.onCollectionChange(props.collection);
  }

  function handleChange({
    target: {
      files: [file]
    }
  }) {
    console.log(file);
    let reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      if (file && file.name) {
        EXIF.getData(file, function() {
          var exifData = EXIF.pretty(this);
          if (exifData) {
            console.log(exifData);
            const description = decodeURI(escape(EXIF.getTag(this, "ImageDescription")));
            const dateTime = EXIF.getTag(this, "DateTimeOriginal");
            createDiary(file.name, description, dateTime, image);
          } else {
            console.log("No EXIF data found in image '" + file.name + "'.");
          }
        });
      }
    };
  }

  return (
    <input
      type="file"
      id="file"
      accept=".jpg, .png, .heif, .heic"
      onChange={handleChange}
    />
  );
}

export default ImageMeta;
