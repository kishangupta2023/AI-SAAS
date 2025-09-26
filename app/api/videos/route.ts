import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });

    // Delete from Database
    await prisma.video.deleteMany({
      where: { publicId },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Delete video error:", error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
