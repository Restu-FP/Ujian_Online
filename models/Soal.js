import mongoose from 'mongoose';

const SoalSchema = new mongoose.Schema({
  pertanyaan: String,
  pilihan: [String],
  jawaban: Number,
  gambar: String, // url gambar jika ada
  dibuatOleh: String, // id dosen
});

export default mongoose.models.Soal || mongoose.model('Soal', SoalSchema);
