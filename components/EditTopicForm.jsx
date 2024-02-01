"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="px-8 py-2 border border-slate-500"
          type="text"
          placeholder="Enter Title"
        />
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="px-8 py-2 border border-slate-500"
          type="text"
          placeholder="Enter Description"
        />
        <button className="px-6 py-3 font-bold text-white bg-green-600 w-fit">
          Edit Topic
        </button>
      </form>
    </div>
  );
}

export default EditTopicForm;
