import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';
import connectDB from './config/db.js';
import Course from './models/courseModel.js';

const seedCourses = async () => {
    try {
        await connectDB();

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

        // Clear existing courses in collection to avoid duplicates during explicit seed
        await Course.deleteMany({});

        const seeded = await Course.insertMany(formattedCourses);
        console.log(`\n🎉 Successfully seeded ${seeded.length} courses directly into MongoDB Atlas!\n`);
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err.message);
        process.exit(1);
    }
};

seedCourses();
