import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { response } from "express";

import { NextResponse } from "next/server";

//PUT

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();
    const note = await Note.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not Found",
        },
        { status: 400 },
      );
    }
    return NextResponse.json({
      success: true,
      data: note,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

// DELETE

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not Found",
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
