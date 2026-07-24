import { useState, useEffect } from 'react';
import CourseCard from '../../components/cardComponent/CardComponent';
import './CourseCatalog.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function CourseCatalog() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterLevel, setFilterLevel] = useState('All');

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await fetch(`${API_URL}/courses`);
                const data = await res.json();
                if (data.success) {
                    setCourses(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch catalog courses:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                              course.instructor.toLowerCase().includes(search.toLowerCase());
        const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
        return matchesSearch && matchesLevel;
    });

    return (
        <div className="catalog-page page-enter">
            {/* Catalog Banner */}
            <div className="catalog-header">
                <div className="catalog-header__content">
                    <h1 className="catalog-header__title">
                        Explore <span className="text-accent">Courses</span>
                    </h1>
                    <p className="catalog-header__subtitle">
                        Discover top-tier tech courses designed to boost your skills and career.
                    </p>
                </div>
            </div>

            <div className="catalog-container">
                {/* Search & Filter Toolbar */}
                <div className="catalog-toolbar">
                    <div className="catalog-search">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="catalog-search__input"
                            placeholder="Search by course title or instructor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="clear-search" onClick={() => setSearch('')}>✕</button>
                        )}
                    </div>

                    <div className="catalog-filters">
                        <span className="filter-label">Level:</span>
                        <div className="filter-pills">
                            {levels.map(level => (
                                <button
                                    key={level}
                                    className={`filter-pill ${filterLevel === level ? 'filter-pill--active' : ''}`}
                                    onClick={() => setFilterLevel(level)}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {loading ? (
                    <div className="courses-loading">
                        {[...Array(6)].map((_, i) => (
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
                    <>
                        <div className="catalog-results-count">
                            Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'course' : 'courses'}
                        </div>
                        
                        <div className="courses-grid">
                            {filteredCourses.map(course => (
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
                    </>
                )}

                {!loading && filteredCourses.length === 0 && (
                    <div className="catalog-empty">
                        <div className="catalog-empty__icon">🔎</div>
                        <h3>No Courses Found</h3>
                        <p>We couldn't find any courses matching "{search}" {filterLevel !== 'All' ? `at ${filterLevel} level` : ''}.</p>
                        <button className="reset-filter-btn" onClick={() => { setSearch(''); setFilterLevel('All'); }}>
                            Reset Search & Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseCatalog;
