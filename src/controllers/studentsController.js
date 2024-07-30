import Student from '../models/Student.js';
import Level from '../models/Level.js';
import User from '../models/User.js';

/* export const assignLevel = async (req, res) => {
  try {
    const { studentId, levelId } = req.body;
    const student = await Student.findOne({ userId: studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }

    student.currentLevel = level._id;
    student.history.push({ level: level._id });
    await student.save();

    res.status(200).json({ message: 'Level assigned successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

export const assignLevel = async (req, res) => {
  try {
    const { studentId, levelId } = req.body;
    
    // Primero, buscamos el usuario (que debe ser un estudiante)
    const user = await User.findById(studentId);
    if (!user || user.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Luego, buscamos o creamos el documento Student asociado
    let student = await Student.findOne({ userId: studentId });
    if (!student) {
      student = new Student({ userId: studentId });
    }

    // Buscamos el nivel
    const level = await Level.findById(levelId);
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }

    // Asignamos el nivel y actualizamos el historial
    student.currentLevel = level._id;
    student.history.push({ level: level._id, assignedAt: new Date() });
    await student.save();

    res.status(200).json({ 
      message: 'Level assigned successfully', 
      student: {
        ...student.toObject(),
        user: {
          name: user.name,
          email: user.email
        },
        currentLevel: level.name
      }
    });
    console.log('Level assigned:', student);
  } catch (error) {
    console.error('Error in assignLevel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/* export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId currentLevel');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
}; */

/* export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    const studentsWithLevels = await Promise.all(students.map(async (user) => {
      const studentDoc = await Student.findOne({ userId: user._id }).populate('currentLevel');
      return {
        ...user.toObject(),
        currentLevel: studentDoc?.currentLevel?.name || 'No asignado'
      };
    }));
    res.status(200).json(studentsWithLevels);
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */

/* export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    const studentsWithLevels = await Promise.all(students.map(async (user) => {
      const studentDoc = await Student.findOne({ userId: user._id }).populate('currentLevel');
      return {
        ...user.toObject(),
        currentLevel: studentDoc?.currentLevel?.name || 'No asignado'
      };
    }));
    res.status(200).json(studentsWithLevels);
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; */

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    const studentsWithLevels = await Promise.all(students.map(async (user) => {
      const studentDoc = await Student.findOne({ userId: user._id }).populate('currentLevel');
      return {
        ...user.toObject(),
        currentLevel: studentDoc?.currentLevel?.name
      };
    }));
    res.status(200).json(studentsWithLevels);
    console.log('Students fetched:', studentsWithLevels);
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user || user.role !== 'student') {
      return res.status(404).json({ error: 'User not found or not a student' });
    }

    const student = new Student({ userId });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignLevelToStudent = async (req, res) => {
  const { studentId, levelId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.currentLevel = levelId;
    await student.save();
    res.status(200).json({ message: 'Level assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning level' });
  }
};