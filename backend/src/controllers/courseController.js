import fs from 'fs/promises';
import path from 'path';
import Course from '../models/courseModel.js';


export const getCourses = async (req, res) => {
    try {
        let courses = await Course.find();

        // Auto-seed if database collection is empty
        if (courses.length === 0) {
            try {
                const jsonPath = path.resolve('data/course.json');
                const fileData = await fs.readFile(jsonPath, 'utf-8');
                const initialCourses = JSON.parse(fileData);
                
                const formattedCourses = initialCourses.map(c => ({
                    courseId: c.id,
                    title: c.title,
                    instructor: c.instructor,
                    price: c.price,
                    duration: c.duration,
                    level: c.level,
                    image: c.image
                }));

                courses = await Course.insertMany(formattedCourses);
                console.log(`📦 Auto-seeded ${courses.length} courses to MongoDB Atlas.`);
            } catch (seedErr) {
                console.warn('Auto-seeding courses skipped or file not found:', seedErr.message);
            }
        }

        res.json({
            success: true,
            data: courses
        });
    } catch (err) {
        console.error('Fetch courses error:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch courses' });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        
        let course;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            course = await Course.findById(id);
        } else {
            course = await Course.findOne({ courseId: Number(id) });
        }

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (err) {
        console.error('Fetch single course error:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch course details' });
    }
};
