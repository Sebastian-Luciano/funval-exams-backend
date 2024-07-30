

/* const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
}); */

/* const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, enum: ['simple', 'multiple', 'video'], required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
}); */

/* const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  questions: [questionSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true }); */
/* 
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  timer: { type: Number }, // tiempo en minutos
  questions: [questionSchema],
}, { timestamps: true });

export default mongoose.model('Exam', examSchema); */

/* 
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  timer: { type: Number },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
 */

// src/models/Exam.js
import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  questions: [{
    question: { type: String, required: true },
    type: { type: String, enum: ['simple', 'multiple', 'video'], required: true },
    options: [{ type: String }],
    correctAnswer: { type: String }
  }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);


/* 
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true },
  timer: { type: Number },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Exam', examSchema); */