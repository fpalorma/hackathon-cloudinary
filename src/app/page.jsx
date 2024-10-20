"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSuccess = (results) => {
    console.log(results);
    setImage(results.info);
    setIsLoading(true);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-orange-500 font-bold text-xl">¡Dulce o foto!</h1>
        <p className="text-white">
          Octubre es el mes de Halloween, por eso, junto a Cloudinary te
          brindamos esta herramienta para que tus fotos estén en modo spooky
        </p>
        <p className="text-white">
          ¿Cómo funciona? Fácil! Haz click en cargar foto y sube alguna de tu
          galería o usa tu cámara para tomar una nueva, súbela y espera el
          resultado. Luego descargala o compartela con tus amigos
        </p>
        {!isLoading && !image && null}

        {isLoading && image && <p>Cargando imagen...</p>}

        {image && (
          <>
            <CldImage
              width={image.width}
              height={image.height}
              src={image.public_id}
              sizes="100vw"
              alt="Cloudinary image"
              replaceBackground="add a halloween theme with scary ghosts and jack o lanterns"
              onLoad={() => setIsLoading(false)}
            />
          </>
        )}

        <CldUploadWidget
          onSuccess={(result) => handleOnSuccess(result)}
          uploadPreset="hackaton-cloudinary"
          options={{
            sources: ["local", "camera"],
            maxFiles: 1,
            multiple: false,
          }}
        >
          {({ open }) => {
            return (
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded"
                onClick={() => {
                  open();
                  setImage("");
                }}
              >
                Sube tu foto
              </button>
            );
          }}
        </CldUploadWidget>
      </main>
    </div>
  );
}
