import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import Jawaban from '../../../models/Jawaban';

export async function GET(req) {
  await connectDB();
  // Cari semua user yang pernah mengerjakan soal (ada di Jawaban)
  const jawabanUsers = await Jawaban.distinct('username');
  // Ambil data user dari tabel User
  const users = await User.find({ username: { $in: jawabanUsers } }, { username: 1, _id: 0 });
  return Response.json(users);
}
