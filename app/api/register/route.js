import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import { hash } from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  const { username, password } = await req.json();
  if (!username || !password) return Response.json({ error: 'Data tidak lengkap' }, { status: 400 });
  const existing = await User.findOne({ username });
  if (existing) return Response.json({ error: 'Username sudah terdaftar' }, { status: 409 });
  const hashed = await hash(password, 10);
  const user = await User.create({ username, password: hashed, role: 'peserta' });
  return Response.json({ success: true, user: { username: user.username, userId: user._id }, role: 'peserta', userId: user._id });
}
