"use client";
import { Formik } from "formik";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const API_BASE = "https://walrus-app-x8np4.ondigitalocean.app";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function Index() {
  const [form, setForm] = useState([]);
  const [dubber, setDubber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({} as any);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.title = "Serial Rena Nene";
    GetTodos();
  }, []);

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

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-4 lg:p-24 py-4">
        <h2 className="text-4xl font-bold text-center">Serial Rena Nene</h2>
        <div className="h-full w-full flex gap-2 overflow-x-scroll px-4 text-sm">
          {form.map((data, i) => (
            <div
              className="min-h-[400px] h-fit lg:min-h-[400px] lg:max-w-[600px] min-w-[100%] lg:min-w-[500px] items-center justify-center bg-white rounded-md mb-4"
              key={i}
            >
              <Formik
                initialValues={{
                  title: data["title"],
                  description: data["description"],
                  dubber: data["dubber"],
                  enabled: data["enabled"],
                  script: data["script"],
                }}
                onSubmit={(e) => {}}
              >
                {({ values, setFieldValue }) => (
                  <div className="flex flex-col py-2 gap-2">
                    <div className="flex gap-2 px-2">
                      <button
                        className="bg-red-500 text-white uppercase px-4 py-1 rounded-md hover:bg-red-700"
                        onClick={() => {
                          setSelectedData(data);
                          setIsDialog(!isDialog);
                        }}
                      >
                        Hapus
                      </button>
                      <button
                        type="submit"
                        className="w-full bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
                        onClick={() => {
                          UpdateTodos(data["_id"], {
                            title: values.title,
                            dubber: values.dubber,
                            script: values.script,
                          });
                        }}
                      >
                        Simpan
                      </button>
                    </div>
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Judul
                      </h5>
                      <div className="flex gap-2 justify-center px-4">
                        <input
                          className="px-2 py-1 rounded-md border text-black w-full"
                          placeholder="Ketik Judul Disini"
                          name="title"
                          value={values.title}
                          onChange={(value) => {
                            setFieldValue("title", value.target.value);
                          }}
                          onBlur={() => {
                            UpdateTodos(data["_id"], {
                              title: values.title,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <br />
                    <div>
                      <h5 className="text-2xl font-bold text-center text-black">
                        Dubber dan Karakter
                      </h5>
                      <div className="flex flex-col gap-2">
                        {Object.keys(values.dubber).map((e: any, i: any) => (
                          <div
                            className="flex flex-col gap-2 justify-center px-4"
                            key={i}
                          >
                            <div>
                              <h5 className="text-md font-bold text-center text-black">
                                Karakter {i + 1}
                              </h5>
                              <div className="flex gap-1">
                                <input
                                  className="px-2 py-1 rounded-md border text-black w-full"
                                  placeholder="Karakter"
                                  name={`dubber[${i}].name`}
                                  value={values.dubber[i]["name"]}
                                  onChange={(value) =>
                                    setFieldValue(
                                      `dubber[${i}].name`,
                                      value.target.value
                                    )
                                  }
                                  onBlur={() => {
                                    UpdateTodos(data["_id"], {
                                      title: values.title,
                                      dubber: values.dubber,
                                    });
                                  }}
                                />
                                <div className="flex flex-col justify-center w-10">
                                  <input
                                    className="px-2 py-1 rounded-md border text-black h-10 w-full"
                                    type="checkbox"
                                    name="done"
                                    value="true"
                                    checked={values.dubber[i]["done"]}
                                    onChange={(value) =>
                                      setFieldValue(
                                        `dubber[${i}].done`,
                                        value.target.checked
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5 className="text-md font-bold text-center text-black">
                                Dubber {i + 1}
                              </h5>
                              <input
                                className="px-2 py-1 rounded-md border text-black w-full"
                                placeholder="Dubber"
                                name={`dubber[${i}].voice`}
                                value={values.dubber[i]["voice"]}
                                onChange={(value) =>
                                  setFieldValue(
                                    `dubber[${i}].voice`,
                                    value.target.value
                                  )
                                }
                                onBlur={() => {
                                  UpdateTodos(data["_id"], {
                                    title: values.title,
                                    dubber: values.dubber,
                                  });
                                }}
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
                          {Object.keys(values.dubber).length === 1 ? (
                            ""
                          ) : (
                            <button
                              type="button"
                              className="bg-red-500 uppercase w-[32px] h-[32px] rounded-full hover:bg-red-700 text-center text-xl "
                              onClick={() => {
                                setFieldValue("dubber", [
                                  ...Object.keys(values.dubber).slice(
                                    0,
                                    Object.keys(values.dubber).length - 1
                                  ),
                                ]);
                              }}
                            >
                              -
                            </button>
                          )}
                          <button
                            type="button"
                            className="bg-green-500 uppercase w-[32px] h-[32px] rounded-full hover:bg-green-700 text-center text-xl "
                            onClick={() => {
                              setFieldValue("dubber", [
                                ...values.dubber,
                                {
                                  name: "",
                                  voice: "",
                                  done: false,
                                },
                              ]);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <br />
                      <div className="flex flex-col">
                        <h5 className="text-2xl font-bold text-center text-black">
                          Naskah
                        </h5>
                        <div className="p-2 text-black">
                          <ReactQuill
                            theme="snow"
                            value={values.script}
                            onBlur={() => {
                              UpdateTodos(data["_id"], {
                                title: values.title,
                                dubber: values.dubber,
                                script: values.script,
                              });
                            }}
                            onChange={(value) => {
                              setFieldValue("script", value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          ))}
          <div className="min-h-[400px] h-fit lg:min-h-[400px] lg:max-w-[600px] min-w-[100%] lg:min-w-[500px] items-center justify-center bg-white rounded-md mb-4">
            <button
              className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400"
              onClick={() => PostTodos({ title: "Judul Baru" })}
            >
              Tambah
            </button>
          </div>
        </div>
        <button className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400">
          Simpan Semua
        </button>
        <Link href={"/"}>
          <button className="bg-red-500 uppercase px-4 py-1 rounded-md hover:bg-red-800 font-bold">
            Kembali
          </button>
        </Link>
        {isDialog ? (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 100,
            }}
          >
            <div
              style={{
                position: "absolute",
                float: "left",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="bg-white p-2 rounded-md">
                <h1 style={{ color: "black" }}>
                  Apakah anda yakin ingin menghapus{" "}
                  <span className="font-bold">{selectedData.title}</span>
                </h1>
                <br />
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      DeleteTodos(selectedData["_id"]);
                      setIsDialog(!isDialog);
                    }}
                    style={{
                      backgroundColor: "red",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIsDialog(!isDialog)}
                    style={{
                      backgroundColor: "blue",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
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

export default Index;
