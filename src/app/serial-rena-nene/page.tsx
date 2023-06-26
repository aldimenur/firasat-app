/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Formik } from "formik";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

const API_BASE = "http://localhost:5000";

function index() {
  const [cardRow, setCardRow] = useState(1);
  const [cardJudul, setCardJudul] = useState("");
  const [form, setForm] = useState([]);
  const [characterCount, setCharacterCount] = useState(1);
  const [dubber, setDubber] = useState("");
  const [showModal, setShowModal] = useState(false);

  // useLayoutEffect(() => {
  //   if (sessionStorage.getItem("state")) {
  //     setCardRow(Number(sessionStorage.getItem("state")));
  //   } else {
  //     sessionStorage.setItem("state", cardRow.toString());
  //   }
  // }, []);

  // useLayoutEffect(() => {
  //   setCardJudul(String(sessionStorage.getItem("judul")));
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("state", cardRow.toString());
  // }, [cardRow]);

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.log(err));
  };

  const PostTodos = (data: any) => {
    fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(GetTodos)
      .catch((err) => console.log(err));
  };

  const DeleteTodos = (id: any) => {
    fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    })
      .then(GetTodos)
      .catch((err) => console.log(err));
  };

  const UpdateTodos = (id: any, data: any) => {
    fetch(API_BASE + "/todo/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(GetTodos)
      .catch((err) => console.log(err));
  };

  // console.log(form);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-4 p-24">
        <h2 className="text-4xl font-bold text-center">Serial Rena Nene</h2>
        <div className="flex gap-4">
          <button
            className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
            onClick={() => PostTodos({ title: "Judul Baru" })}
          >
            Tambah
          </button>
        </div>
        <div className="h-full w-full flex gap-4 overflow-x-scroll ">
          {form.map((data, i) => (
            <div
              className="min-h-[400px] min-w-[500px] items-center justify-center bg-white rounded-md"
              key={i}
            >
              <button
                className="bg-red-500 text-white uppercase px-4 py-1 rounded-md hover:bg-red-700"
                onClick={() => DeleteTodos(data._id)}
              >
                Hapus
              </button>
              <Formik
                initialValues={{
                  title: data.title,
                  description: data.description,
                  dubber: data.dubber,
                  enabled: data.enabled,
                }}
                onSubmit={(e) => {}}
              >
                {({ values, handleChange }) => (
                  <div className="flex flex-col py-2 gap-2">
                    <button
                      type="submit"
                      className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
                      onClick={() => {
                        UpdateTodos(data._id, {
                          title: values.title,
                          dubber: [
                            {
                              name: values.dubber.name,
                              voice: values.dubber.voice,
                            },
                          ],
                        });
                        console.log(values.dubber);
                      }}
                    >
                      Simpan
                    </button>
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Judul
                      </h5>
                      <div className="flex gap-2 justify-center">
                        <input
                          className="px-2 py-1 rounded-md border text-black"
                          placeholder="Ketik Judul Disini"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Dubber dan Karakter
                      </h5>
                      <div className="flex flex-col gap-2">
                        {data.dubber.map((e, i) => (
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
                                value={values.dubber[i].name}
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
                                value={values.dubber[i].voice}
                                onChange={handleChange}
                              />
                              {/* <select
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
                              </select> */}
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
        <Link href={"/"}>
          <button className="bg-red-500 uppercase px-4 py-1 rounded-md hover:bg-red-800 font-bold">
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
    </>
  );
}

export default index;
