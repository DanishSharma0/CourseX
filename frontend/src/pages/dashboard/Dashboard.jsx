import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CourseCard from '../../components/cardComponent/CardComponent';
import './dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardCourses() {
            try {
                const res = await fetch(`${API_URL}/courses`);
                const data = await res.json();
                if (data.success) {
                    setCourses(data.data);
                }
            } catch (err) {
                console.error('Fetch dashboard error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardCourses();
    }, []);

    // Simulated user enrolled courses (first 2 courses)
    const enrolledCourses = courses.slice(0, 2);
    const recommendedCourses = courses.slice(2, 6);

    return (
        <div className="user-dashboard page-enter">
            {/* Welcome Banner */}
            <div className="dash-welcome">
                <div className="dash-welcome__inner">
                    <div className="dash-welcome__text">
                        <h1>Welcome back, <span className="text-accent">{user?.firstName || 'Student'}</span>! 👋</h1>
                        <p>Keep up the great momentum. You're making excellent progress in your learning path.</p>
                    </div>
                    <Link to="/courses" className="dash-browse-btn">
                        Browse More Courses
                    </Link>
                </div>
            </div>

            <div className="dash-container">
                {/* Stats Metric Grid */}
                <div className="dash-metrics-grid">
                    <div className="metric-card">
                        <div className="metric-icon">📚</div>
                        <div className="metric-data">
                            <span className="metric-value">{enrolledCourses.length}</span>
                            <span className="metric-label">Enrolled Courses</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon">⏱️</div>
                        <div className="metric-data">
                            <span className="metric-value">18.5 hrs</span>
                            <span className="metric-label">Hours Learned</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon">🏆</div>
                        <div className="metric-data">
                            <span className="metric-value">1</span>
                            <span className="metric-label">Certificates Earned</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon">🔥</div>
                        <div className="metric-data">
                            <span className="metric-value">5 Days</span>
                            <span className="metric-label">Learning Streak</span>
                        </div>
                    </div>
                </div>

                {/* Section: In Progress / Enrolled Courses */}
                <section className="dash-section">
                    <div className="dash-section__header">
                        <h2>My <span className="text-accent">Enrolled Courses</span></h2>
                        <span className="count-tag">{enrolledCourses.length} active</span>
                    </div>

                    {loading ? (
                        <div className="courses-loading">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="skeleton-card">
                                    <div className="skeleton-img"></div>
                                    <div className="skeleton-body">
                                        <div className="skeleton-line skeleton-line--lg"></div>
                                        <div className="skeleton-line skeleton-line--sm"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="enrolled-grid">
                            {enrolledCourses.map(course => (
                                <div key={course._id || course.id} className="enrolled-card">
                                    <img src={course.image} alt={course.title} className="enrolled-card__img" />
                                    <div className="enrolled-card__info">
                                        <span className="enrolled-level">{course.level}</span>
                                        <h3>{course.title}</h3>
                                        <p>👤 {course.instructor}</p>

                                        {/* Progress Bar */}
                                        <div className="progress-bar-wrap">
                                            <div className="progress-bar-labels">
                                                <span>Progress</span>
                                                <span>45%</span>
                                            </div>
                                            <div className="progress-track">
                                                <div className="progress-fill" style={{ width: '45%' }}></div>
                                            </div>
                                        </div>

                                        <Link to={`/courses/${course._id || course.id}`} className="continue-btn">
                                            Continue Learning ▶
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Section: Recommended for You */}
                <section className="dash-section">
                    <div className="dash-section__header">
                        <h2>Recommended <span className="text-accent">for You</span></h2>
                        <Link to="/courses" className="view-all-link">View Catalog →</Link>
                    </div>

                    {!loading && (
                        <div className="courses-grid">
                            {recommendedCourses.map(course => (
                                <CourseCard
                                    key={course._id || course.id}
                                    id={course._id || course.id}
                                    image={course.image}
                                    title={course.title}
                                    instructor={course.instructor}
                                    price={course.price}
                                    level={course.level}
                                    duration={course.duration}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;