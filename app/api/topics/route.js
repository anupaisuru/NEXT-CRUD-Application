import connectMongoDB from "@/libs/db";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

//create new topic
export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 200 });
}

//get all topics
export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 200 });
}

//delete topic
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "topic deleted" }, { status: 200 });
}
