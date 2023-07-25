import React from "react";

function TaskCard({
  i,
  Formik,
  ReactQuill,
  data,
  UpdateTodos,
  setSelectedData,
  setIsDialog,
  isDialog,
}: any) {
  return (
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
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }: any) => (
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
                    onChange={(value: any) => {
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
  );
}

export default TaskCard;
