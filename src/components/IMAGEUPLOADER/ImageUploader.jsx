import { useState } from "react";
import progressbar from "../../assets/images/progressbar.gif";

function ImageUploader() {
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState();
  const [isupload, setupload] = useState(false);

  const UPOLAD = () => {
    if (isupload) {
      return (
        <>
          <img style={{ width: "30px" }} src={progressbar} alt="uploader"></img>
          Uploading.....
        </>
      );
    } else {
      return <>..</>;
    }
  };

  const handleSubmit = (e) => {
    setupload(true);
    e.preventDefault();
    if (image === "") {
      console.log("no image");
    } else {
      const formData = new FormData();
      formData.append("image", imageData);
      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setupload(false);
            alert("upload fail");
            console.log(data.error);
          } else {
            setupload(false);
            console.log(data.image.image);
            alert("image uploaded");
          }
        });
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="file"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setImageData(e.target.files[0]);
            }}
          />
        </p>

        <button type="submit">Submit</button>
        <UPOLAD />
      </form>
    </div>
  );
}

export default ImageUploader;
