import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopic = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("faild to fetch topics", error);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function TopicsList() {
  const { topics } = await getTopic();

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="flex items-start justify-between gap-5 p-4 my-3 border border-slate-300"
        >
          <div>
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/EditTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default TopicsList;
