import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // hash
  role: { type: String, enum: ['peserta', 'admin', 'dosen'] },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
