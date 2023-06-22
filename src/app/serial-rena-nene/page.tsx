/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Formik } from "formik";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

function index() {
  const [cardRow, setCardRow] = useState(1);
  const [cardJudul, setCardJudul] = useState("");
  const [form, setForm] = useState([]);
  const [characterCount, setCharacterCount] = useState(1);

  useLayoutEffect(() => {
    if (sessionStorage.getItem("state")) {
      setCardRow(Number(sessionStorage.getItem("state")));
    } else {
      sessionStorage.setItem("state", cardRow.toString());
    }
  }, []);

  useLayoutEffect(() => {
    setCardJudul(String(sessionStorage.getItem("judul")));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("state", cardRow.toString());
  }, [cardRow]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <h2 className="text-4xl font-bold text-center">Serial Rena Nene</h2>
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
                            console.log(form);
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
                            <input
                              className="px-2 py-1 rounded-md border text-black"
                              placeholder="Karakter"
                              name="karakter"
                              value={values.karakter}
                              onChange={handleChange}
                            />
                            <input
                              className="px-2 py-1 rounded-md border text-black"
                              placeholder="Dubber"
                              name="dubber"
                              value={values.dubber}
                              onChange={handleChange}
                            />
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
        <Link href={"/"}>
          <button className="bg-red-500 uppercase px-4 py-1 rounded-md hover:bg-red-800 font-bold">
            Kembali
          </button>
        </Link>
      </main>
    </>
  );
}

export default index;
