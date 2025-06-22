import { connectDB } from '../../../lib/mongodb';
import Soal from '../../../models/Soal';

export async function GET() {
  await connectDB();
  const soal = await Soal.find();
  return Response.json(soal);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const soal = await Soal.create(data);
  return Response.json(soal);
}

export async function PUT(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const data = await req.json();
  const soal = await Soal.findByIdAndUpdate(id, data, { new: true });
  return Response.json(soal);
}

export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await Soal.findByIdAndDelete(id);
  return Response.json({ success: true });
}
