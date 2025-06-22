import mongoose from 'mongoose';

const JawabanSchema = new mongoose.Schema({
  username: String, // tambahkan username agar bisa filter statistik peserta
  userId: String,
  soalId: String,
  jawaban: [Number],
  skor: Number,
  waktuSelesai: Date,
});

export default mongoose.models.Jawaban || mongoose.model('Jawaban', JawabanSchema);
