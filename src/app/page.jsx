'use client'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import {  useState } from 'react';

export default function Home() {
const [image, setImage] = useState("")
const [isLoading, setIsLoading] = useState(false)
const handleOnSuccess = (results)=>{
  console.log( results);
  setImage(results.info)
  setIsLoading(true)
}



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

       {(!isLoading && !image) && null}

{isLoading && image && (
  <p>Cargando imagen...</p>
)}

{image && (
  <>
  <CldImage
    width={image.width}
    height={image.height}
    src={image.public_id}
    sizes="100vw"
    alt="Cloudinary image"
    replaceBackground="add a halloween theme with scary ghosts and jack o lanterns"
    onLoad={()=>setIsLoading(false)}
    />
    </>
)}


<CldUploadWidget
    onSuccess={(result)=>handleOnSuccess(result)}
    uploadPreset="hackaton-cloudinary"
    options={{
      sources:["local", "camera"],
      maxFiles: 1,
      multiple:false
    }}
    >
  {({ open }) => {
    return (
      <button onClick={() => {
        open()
        setImage("")
        }}>
        Upload an Image
      </button>
    );
  }}
  
</CldUploadWidget>
 
      </main>
     
    </div>
  );
}
