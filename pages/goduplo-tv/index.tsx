/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import "../../app/globals.css";

function index() {
  const router = useRouter();
  const [cardRow, setCardRow] = useState(1);
  const [cardJudul, setCardJudul] = useState("");
  const [form, setForm] = useState([]);
  const [characterCount, setCharacterCount] = useState(1);
  const [dubber, setDubber] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("state", cardRow.toString());
  }, [cardRow]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <h2 className="text-4xl font-bold text-center">GoDuplo TV</h2>
        <div className="flex gap-4">
          <button
            className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
            onClick={() => setCardRow(cardRow + 1)}
          >
            Tambah
          </button>
          <button
            className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
            onClick={() => {
              if (cardRow > 1) setCardRow(cardRow - 1);
            }}
          >
            Kurang
          </button>
        </div>
        <div className="h-full w-full flex gap-4 overflow-x-scroll ">
          {Array.from({ length: cardRow }).map((_, i) => (
            <div
              className="min-h-[400px] min-w-[500px] items-center justify-center bg-white rounded-md"
              key={i}
            >
              <Formik
                initialValues={{ judul: cardJudul, karakter: "", dubber: "" }}
                onSubmit={(e) => {}}
              >
                {({ values, handleChange }) => (
                  <div className="flex flex-col py-2 gap-2">
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Judul
                      </h5>
                      <div className="flex gap-2 justify-center">
                        <input
                          className="px-2 py-1 rounded-md border text-black"
                          placeholder="Ketik Judul Disini"
                          name="judul"
                          value={values.judul}
                          onChange={handleChange}
                        />
                        <button
                          type="submit"
                          className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
                          onClick={() => {
                            sessionStorage.setItem("judul", values.judul);
                          }}
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Dubber dan Karakter
                      </h5>
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: characterCount }).map((_, i) => (
                          <div
                            className="flex gap-2 justify-center px-4"
                            key={i}
                          >
                            <div>
                              <h5 className="text-md font-bold text-center text-black">
                                Karakter {i + 1}
                              </h5>
                              <input
                                className="px-2 py-1 rounded-md border text-black h-10"
                                placeholder="Karakter"
                                name="karakter"
                                value={values.karakter}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <h5 className="text-md font-bold text-center text-black">
                                Dubber {i + 1}
                              </h5>
                              <input
                                className="px-2 py-1 rounded-md border text-black h-10"
                                placeholder="Dubber"
                                name="dubber"
                                value={values.dubber}
                                onChange={handleChange}
                              />
                              <select
                                className="px-2 py-1 rounded-md border text-black h-10"
                                onChange={(value) => {
                                  if (value.target.value === "Tambah") {
                                    setShowModal(true);
                                  } else {
                                    setDubber(value.target.value);
                                  }
                                }}
                              >
                                <option value="Aldi">Aldi</option>
                                <option value="Yusuf">Yusuf</option>
                                <option value="Sakinah">Sakinah</option>
                                <option value="Tambah">Tambah</option>
                              </select>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-center gap-2">
                          {characterCount === 1 ? (
                            ""
                          ) : (
                            <button
                              type="button"
                              className="bg-red-500 uppercase w-[32px] h-[32px] rounded-full hover:bg-red-700 text-center text-xl "
                              onClick={() => {
                                if (characterCount > 1)
                                  setCharacterCount(characterCount - 1);
                              }}
                            >
                              -
                            </button>
                          )}
                          <button
                            type="button"
                            className="bg-green-500 uppercase w-[32px] h-[32px] rounded-full hover:bg-green-700 text-center text-xl "
                            onClick={() => {
                              if (characterCount >= 1)
                                setCharacterCount(characterCount + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          ))}
        </div>
        <button className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400">
          Simpan Semua
        </button>
        <Link href={`/`}>
          <button
            className="bg-red-500 uppercase px-4 py-1 rounded-md hover:bg-red-800 font-bold"
            // onClick={() => router.push("/")}
          >
            Kembali
          </button>
        </Link>
      </main>
      {showModal ? (
        <div className="w-screen h-screen absolute bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  backdrop-blur-sm">
          <div className="z-10 w-[30%] h-[50%] bg-white p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-md">
            <div className="w-full">
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-full w-8 h-8 hover:bg-red-700"
                  onClick={() => setShowModal(!showModal)}
                >
                  X
                </button>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center text-black">
              Tambah Dubber
            </h1>
            <div className="flex flex-col gap-2">
              <input
                className="px-2 py-1 rounded-md border text-black h-10"
                placeholder="Nama Dubber"
                value={dubber}
                onChange={(value) => setDubber(value.target.value)}
              />
              <button
                className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
                onClick={() => {}}
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 w-full h-full z-10">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-fit h-fit bg-white p-5 rounded-md">
            <div className="w-full flex flex-col justify-center items-center text-black text-center gap-2">
              <Image
                src="/undraw_under_construction_-46-pa.svg"
                width={300}
                height={300}
                alt="Construction"
              />
              <span>Masih Dalam Pengembangan</span>
              <button
                className="bg-blue-500 rounded-md text-white px-2 py-1  hover:bg-blue-700"
                onClick={router.back}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
