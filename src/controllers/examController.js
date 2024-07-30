import Exam from '../models/Exam.js';

/* export const createExam = async (req, res) => {
  try {
    const { title, level, questions } = req.body;
    console.log('Datos recibidos:', req.body);
    // Validación
    if (!title || !level || !timer || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Datos de examen inválidos' });
    }

    // Validación adicional para cada pregunta
    for (const question of questions) {
      if (!question.question || !question.type || !question.correctAnswer) {
        return res.status(400).json({ error: 'Datos de pregunta inválidos' });
      }
    }

    const exam = new Exam({
      title,
      level,
      timer,
      questions,
      creator: req.user._id
    });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    console.error('Error al crear examen:', error);
    res.status(400).json({ error: error.message });
  }
}; */

export const createExam = async (req, res) => {
  try {
    const { title, level, timer, questions } = req.body;

    const exam = new Exam({
      title,
      level,
      timer,
      questions,
      creator: req.user._id
    });

    await exam.save();

    res.status(201).json(exam);
  } catch (error) {
    console.error('Error al crear examen:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getExamsForStudent = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).populate('currentLevel');
    if (!student || !student.currentLevel) {
      return res.status(404).json({ error: 'Student or level not found' });
    }

    const exams = await Exam.find({ level: student.currentLevel._id });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ creator: req.user._id });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { title, level, questions } = req.body;
    const exam = await Exam.findOneAndUpdate(
      { _id: req.params.id, creator: req.user._id },
      { title, level, questions },
      { new: true }
    );
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOneAndDelete({ _id: req.params.id, creator: req.user._id });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};