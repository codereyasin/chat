import React, { useState } from 'react'
import { storage } from "../utils/firebase"

function UploadFiles() {
    const [image, setImage] = useState(null)
    const [url , setUrl] = useState(null)
    console.log(image);
    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    const uploadFils = () =>{
        if(!image) return alert('choose an image')
        const storageRef = storage.ref(`profile/${image.name}`)
        const uploadTask = storageRef.put(image)
        uploadTask.on(
            "state_change",
            (snapshot) =>{
            const progress = Math.round(
               ( snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            console.log(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            async() => {
                const url = await storageRef.getDownloadURL()
                setUrl(url);
            }
        )
    }

  return (
    <div>
      <input type="file" accept='image/*' onChange={handleChange}/>
    <button onClick={uploadFils}>Upload</button>
    {url && <img src={url} alt="" />}
    </div>
  )
}

export default UploadFiles
