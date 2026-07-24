import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/cardComponent/CardComponent';
import './Home.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Home() {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeatured() {
            try {
                const res = await fetch(`${API_URL}/courses`);
                const data = await res.json();
                if (data.success) {
                    setFeaturedCourses(data.data.slice(0, 4));
                }
            } catch (err) {
                console.error('Failed to fetch featured courses:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchFeatured();
    }, []);

    return (
        <div className="home-page page-enter">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__bg-grid"></div>
                <div className="hero__content">
                    <div className="hero__badge">
                        <span className="hero__badge-dot"></span>
                        🚀 Over 10,000+ Active Students Learning Daily
                    </div>
                    <h1 className="hero__title">
                        Master Technical Skills,<br />
                        <span className="hero__title-accent">Build Real Projects</span>
                    </h1>
                    <p className="hero__subtitle">
                        Industry-vetted software engineering & web development courses.
                        Learn at your own pace with expert instructors and hands-on coding.
                    </p>
                    <div className="hero__actions">
                        <Link to="/courses" className="hero__cta-primary">
                            Explore All Courses
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                        <Link to="/signup" className="hero__cta-secondary">Join Free Today</Link>
                    </div>
                </div>
            </section>

            {/* Stats Counter Section */}
            <section className="home-stats">
                <div className="home-stats__inner">
                    <div className="home-stats__item">
                        <span className="home-stats__number">12+</span>
                        <span className="home-stats__label">Expert Courses</span>
                    </div>
                    <div className="home-stats__divider"></div>
                    <div className="home-stats__item">
                        <span className="home-stats__number">50k+</span>
                        <span className="home-stats__label">Active Learners</span>
                    </div>
                    <div className="home-stats__divider"></div>
                    <div className="home-stats__item">
                        <span className="home-stats__number">10+</span>
                        <span className="home-stats__label">Top Instructors</span>
                    </div>
                    <div className="home-stats__divider"></div>
                    <div className="home-stats__item">
                        <span className="home-stats__number">95%</span>
                        <span className="home-stats__label">Completion Rate</span>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="home-featured">
                <div className="home-featured__header">
                    <div>
                        <h2 className="home-featured__title">
                            Featured <span className="text-accent">Courses</span>
                        </h2>
                        <p className="home-featured__desc">Handpicked top-rated courses to jumpstart your developer path</p>
                    </div>
                    <Link to="/courses" className="home-featured__link">
                        View All Courses →
                    </Link>
                </div>

                {loading ? (
                    <div className="courses-loading">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-img"></div>
                                <div className="skeleton-body">
                                    <div className="skeleton-line skeleton-line--lg"></div>
                                    <div className="skeleton-line skeleton-line--sm"></div>
                                    <div className="skeleton-line skeleton-line--md"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="courses-grid">
                        {featuredCourses.map(course => (
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

            {/* Value Proposition / Why Us Section */}
            <section className="home-why">
                <h2 className="home-why__title">Why Choose <span className="text-accent">CourseX</span>?</h2>
                <div className="home-why__grid">
                    <div className="why-card">
                        <div className="why-card__icon">⚡</div>
                        <h3 className="why-card__title">Learn at Your Own Pace</h3>
                        <p className="why-card__desc">Lifetime access to all enrolled courses. Learn whenever and wherever suits you best.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-card__icon">🛠️</div>
                        <h3 className="why-card__title">Hands-on Real Projects</h3>
                        <p className="why-card__desc">Don't just watch. Build portfolio-worthy full-stack applications with modern tools.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-card__icon">🎓</div>
                        <h3 className="why-card__title">Expert Instructors</h3>
                        <p className="why-card__desc">Learn directly from senior industry engineers with proven real-world expertise.</p>
                    </div>
                </div>
            </section>

            {/* Call To Action Banner */}
            <section className="home-cta">
                <div className="home-cta__inner">
                    <h2>Ready to Start Your Coding Journey?</h2>
                    <p>Join over 50,000+ developers building their future with CourseX today.</p>
                    <Link to="/signup" className="home-cta__btn">Get Started Now</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
