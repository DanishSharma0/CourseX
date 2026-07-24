import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        courseId: {
            type: Number,
            unique: true,
            sparse: true
        },
        title: {
            type: String,
            required: [true, 'Course title is required'],
            trim: true
        },
        instructor: {
            type: String,
            required: [true, 'Instructor name is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        duration: {
            type: String,
            required: [true, 'Duration is required']
        },
        level: {
            type: String,
            required: [true, 'Level is required']
        },
        image: {
            type: String,
            required: [true, 'Image URL is required']
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual property 'id' to maintain frontend compatibility with existing data
courseSchema.virtual('id').get(function () {
    return this.courseId || this._id;
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
