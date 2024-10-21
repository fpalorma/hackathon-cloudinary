"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { creepster } from "./ui/fonts";


export default function Home() {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSuccess = (results) => {
    console.log(results);
    setImage(results.info);
    setIsLoading(true);
  };

  return (
    <div className="">
      <main className="flex flex-col gap-3">
        <h1 className={` text-orange-500 font-bold text-6xl text-center mt-4 font-creepster ${creepster.className}`} >¡Dulce o foto!</h1>
        <div>

        <p className="text-white text-center mx-2">
          Octubre es el mes del terror, por eso, junto a Cloudinary te
          brindamos esta herramienta para que tus fotos estén en modo Halloween.
        </p>
        <p className="text-white text-center mx-2">
          ¿Cómo funciona? Fácil! Haz click en cargar foto y sube alguna imagen de tu
          galería o usa tu cámara para tomar una foto nueva, súbela y espera el
          resultado. Luego descárgala o compártela con tus amigos.
        </p>
        </div>
        {!isLoading && !image && null}

        {isLoading && image && (
          <>
          <Image
          className="mx-auto animate-pulse"
          width={273}
          height={258}
          src={"/assets/lantern-loader-1.webp"}
          alt={`jack o lantern loader`}
          />
          <p className="text-white text-center">Cargando imagen...</p>
          </>
        )}

        {image && (
          <>
            <CldImage
            className="mx-auto"
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
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 border border-orange-700 rounded mx-auto mb-5"
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
