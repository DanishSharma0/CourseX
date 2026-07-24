import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './CourseDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [enrolled, setEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        async function fetchCourseDetail() {
            try {
                const res = await fetch(`${API_URL}/courses/${id}`);
                const data = await res.json();

                if (data.success && data.data) {
                    setCourse(data.data);
                } else {
                    setError('Course not found');
                }
            } catch (err) {
                console.error('Fetch course detail error:', err);
                setError('Unable to load course details');
            } finally {
                setLoading(false);
            }
        }
        fetchCourseDetail();
    }, [id]);

    const handleEnroll = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setEnrolling(true);
        setTimeout(() => {
            setEnrolled(true);
            setEnrolling(false);
        }, 800);
    };

    if (loading) {
        return (
            <div className="course-detail-loading page-enter">
                <div className="detail-spinner"></div>
                <p>Loading course content...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="course-detail-error page-enter">
                <h2>⚠️ Course Not Found</h2>
                <p>{error || 'The requested course does not exist.'}</p>
                <Link to="/courses" className="back-btn">← Back to All Courses</Link>
            </div>
        );
    }

    const syllabusModules = [
        { title: 'Module 1: Introduction & Environment Setup', lessons: '4 lessons • 45 mins' },
        { title: 'Module 2: Core Concepts & Deep Dive Architecture', lessons: '8 lessons • 2 hrs 15 mins' },
        { title: 'Module 3: Hands-on Real World Project Implementation', lessons: '6 lessons • 3 hrs' },
        { title: 'Module 4: Deployment, Best Practices & Performance', lessons: '3 lessons • 1 hr 10 mins' },
    ];

    return (
        <div className="course-detail-page page-enter">
            {/* Header Banner */}
            <div className="course-detail-header">
                <div className="course-detail-header__inner">
                    <Link to="/courses" className="breadcrumb-link">← All Courses</Link>
                    <div className="course-badge-level">{course.level}</div>
                    <h1 className="course-detail__title">{course.title}</h1>
                    <p className="course-detail__subtitle">
                        Master {course.title} from scratch with step-by-step practical examples and hands-on exercises.
                    </p>

                    <div className="course-detail__meta">
                        <span>👤 Instructor: <strong>{course.instructor}</strong></span>
                        <span>⏱️ Duration: <strong>{course.duration}</strong></span>
                        <span>⭐ Rating: <strong>4.9 / 5.0</strong></span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="course-detail-container">
                <div className="course-detail-main">
                    {/* Course Overview Section */}
                    <section className="detail-section">
                        <h2>Course Overview</h2>
                        <p>
                            This course is designed to take you from foundational principles to building production-ready applications. 
                            Whether you are a beginner or looking to sharpen your current engineering skills, this course delivers comprehensive, hands-on guidance.
                        </p>

                        <h3>What You Will Learn:</h3>
                        <ul className="learning-outcomes">
                            <li>✅ Master core concepts and industry best practices</li>
                            <li>✅ Build fully functional, production-ready portfolio projects</li>
                            <li>✅ Understand modular code architecture and design patterns</li>
                            <li>✅ Deploy applications live with CI/CD and modern tools</li>
                        </ul>
                    </section>

                    {/* Syllabus Section */}
                    <section className="detail-section">
                        <h2>Course Curriculum</h2>
                        <div className="syllabus-list">
                            {syllabusModules.map((mod, index) => (
                                <div key={index} className="syllabus-item">
                                    <div className="syllabus-item__header">
                                        <span className="syllabus-item__title">{mod.title}</span>
                                        <span className="syllabus-item__lessons">{mod.lessons}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Instructor Bio */}
                    <section className="detail-section">
                        <h2>Instructor</h2>
                        <div className="instructor-card">
                            <div className="instructor-avatar">
                                {course.instructor.charAt(0)}
                            </div>
                            <div className="instructor-info">
                                <h3>{course.instructor}</h3>
                                <p className="instructor-title">Senior Software Engineer & Lead Instructor</p>
                                <p className="instructor-bio">
                                    Passionate educator with 8+ years of industry experience building scalable web applications and mentoring over 20,000 students worldwide.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Card */}
                <div className="course-detail-sidebar">
                    <div className="sidebar-card">
                        <div className="sidebar-img-wrap">
                            <img src={course.image} alt={course.title} className="sidebar-img" />
                        </div>

                        <div className="sidebar-body">
                            <div className="sidebar-price">
                                <span className="current-price">₹{course.price}</span>
                                <span className="original-price">₹{course.price * 2}</span>
                                <span className="discount-tag">50% OFF</span>
                            </div>

                            {enrolled ? (
                                <div className="enrolled-success-box">
                                    <span>🎉</span> Enrolled Successfully!
                                    <Link to="/dashboard" className="go-dashboard-btn">Go to My Dashboard</Link>
                                </div>
                            ) : (
                                <button
                                    className="enroll-now-btn"
                                    onClick={handleEnroll}
                                    disabled={enrolling}
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}

                            <div className="sidebar-perks">
                                <h4>This course includes:</h4>
                                <ul>
                                    <li>📹 {course.duration} on-demand video</li>
                                    <li>💻 Full lifetime access</li>
                                    <li>📱 Access on mobile and desktop</li>
                                    <li>🏆 Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
