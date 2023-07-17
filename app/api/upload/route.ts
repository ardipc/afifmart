// route.ts
import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";
import * as fsall from 'fs';
import { parse } from 'csv-parse'

type Produk = {
  id: number;
  name: string;
  count: number;
  artifacts: string;
  status: string;
}

export async function GET() {
  // const csvPath = path.join(process.cwd(), "public/upload/artifacts.csv");
  const csvPath = path.resolve(__dirname, "../../../public/upload/artifacts.csv");
  const headers = ['id','name','count','artifacts','status'];
  const content = fsall.readFileSync(csvPath, { encoding: 'utf-8' });
  
  // let temp = [];

  parse(content, { delimiter: ',', columns: headers }, (error, result: Produk[]) => {
    if(error) {
      return NextResponse.json({}, { status: 400 });
    }

    return NextResponse.json(result);
  })
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);

  const destinationDirPath = path.join(process.cwd(), "public/upload");
  console.log(destinationDirPath);

  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, { recursive: true });
  }
  await fs.writeFile(
    path.join(destinationDirPath, file.name),
    Buffer.from(fileArrayBuffer)
  );

  return NextResponse.json({
    fileName: file.name,
    size: file.size,
    lastModified: new Date(file.lastModified),
  });
}
