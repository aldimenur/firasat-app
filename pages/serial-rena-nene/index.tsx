import Modal from "../../components/Modal";
import TaskCard from "../../components/TaskCard";
import { Formik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../app/globals.css";
import { useRouter } from "next/navigation";

const API_BASE = "https://walrus-app-x8np4.ondigitalocean.app";

function Index() {
  const router = useRouter();
  const [form, setForm] = useState([]);
  const [dubber, setDubber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [selectedData, setSelectedData] = useState({} as any);
  const [isDone, setIsDone] = useState(false);

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
    <Fragment>
      <main className="flex min-h-screen flex-col items-center gap-4 lg:px-10 lg:py-2">
        <Link href="/">
          <button
            className="bg-red-500 uppercase h-fit px-4 py-1 rounded-md hover:bg-red-800 font-bold fixed lg:absolute bottom-2 lg:top-8 left-2 z-10 lg:left-10 flex items-center"
            // onClick={() => router.push("/")}
          >
            <Image
              src={"/back-svgrepo-com.svg"}
              width={20}
              height={20}
              alt="back"
              style={{
                filter: "invert(1)",
                left: "-5px",
                position: "relative",
              }}
            />
            Kembali
          </button>
        </Link>
        <h2 className="text-xl lg:text-4xl font-bold text-center">
          Serial Rena Nene
        </h2>
        <div className="h-full w-full flex gap-2 overflow-x-scroll px-4 text-sm">
          {form.map((data, i) => (
            <TaskCard
              i={i}
              Formik={Formik}
              ReactQuill={ReactQuill}
              data={data}
              UpdateTodos={UpdateTodos}
              setSelectedData={setSelectedData}
              setIsDialog={setIsDialog}
              isDialog={isDialog}
              key={i}
            />
          ))}
          <div
            className="h-fit min-w-[250px] w-[250px] items-center justify-center 
            bg-white rounded-md mb-4 cursor-pointer flex flex-col gap-1 p-2 hover:bg-gray-100"
            onClick={() => PostTodos({ title: "Judul Baru" })}
          >
            <Image src="/icons8-plus.svg" width={24} height={24} alt="plus" />
            <span className="text-black">Tambah Baru</span>
          </div>
        </div>
        <button className="bg-purple-300 text-black uppercase px-4 py-1 rounded-md hover:bg-purple-400">
          Simpan Semua
        </button>
        {isDialog ? (
          <Modal
            DeleteTodos={DeleteTodos}
            selectedData={selectedData}
            setIsDialog={setIsDialog}
            isDialog={isDialog}
          />
        ) : null}
      </main>
    </Fragment>
  );
}

export default Index;
