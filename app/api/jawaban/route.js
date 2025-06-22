import { connectDB } from '../../../lib/mongodb';
import Jawaban from '../../../models/Jawaban';
import User from '../../../models/User';

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const jawaban = await Jawaban.create(data);
  return Response.json(jawaban);
}

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url, 'http://localhost');
  const role = url.searchParams.get('role');
  const username = url.searchParams.get('username');
  let filter = {};
  if (role === 'peserta' && username) {
    filter.username = username;
  }
  // Untuk admin, ambil semua data dan join ke users
  const jawaban = await Jawaban.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: 'users',
        localField: 'username', // atau 'userId' jika ingin join by id
        foreignField: 'username',
        as: 'userData'
      }
    },
    {
      $addFields: {
        user: { $arrayElemAt: ['$userData', 0] }
      }
    },
    { $project: { userData: 0 } }
  ]);
  return Response.json(jawaban);
}
