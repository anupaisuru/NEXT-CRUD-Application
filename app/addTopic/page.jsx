"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("title and description are requred");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("faild to create topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="px-8 py-2 border border-slate-500"
          type="text"
          placeholder="Enter Title"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="px-8 py-2 border border-slate-500"
          type="text"
          placeholder="Enter Description"
        />
        <button
          type="submit"
          className="px-6 py-3 font-bold text-white bg-green-600 w-fit"
        >
          Add Topic
        </button>
      </form>
    </>
  );
}

export default AddTopic;
