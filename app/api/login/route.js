import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import { compare } from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  const { username, password } = await req.json();
  const user = await User.findOne({ username });
  if (!user) return Response.json({ error: 'User not found' }, { status: 401 });
  const valid = await compare(password, user.password);
  if (!valid) return Response.json({ error: 'Wrong password' }, { status: 401 });
  // Return role and userId for redirect and localStorage
  return Response.json({ success: true, role: user.role, userId: user._id });
}
