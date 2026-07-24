import { Link } from 'react-router-dom';
import './cardComponent.css';

function CourseCard({ id, image, title, instructor, price, level, duration }) {
    const getLevelClass = (lvl) => {
        if (lvl === 'Beginner') return 'badge--beginner';
        if (lvl === 'Intermediate') return 'badge--intermediate';
        if (lvl === 'Advanced') return 'badge--advanced';
        return '';
    };

    const courseLink = id ? `/courses/${id}` : '/courses';

    return (
        <div className="course-card">
            <Link to={courseLink} className="course-card__img-link">
                <div className="course-card__img-wrap">
                    <img src={image} alt={title} className="course-card__img" loading="lazy" />
                    <span className={`course-card__badge ${getLevelClass(level)}`}>{level}</span>
                </div>
            </Link>
            <div className="course-card__body">
                <h3 className="course-card__title">
                    <Link to={courseLink} className="course-card__title-link">{title}</Link>
                </h3>
                <p className="course-card__instructor">👤 {instructor}</p>
                {duration && <p className="course-card__duration">🕐 {duration}</p>}
            </div>
            <div className="course-card__footer">
                <span className="course-card__price">₹{price}</span>
                <Link to={courseLink} className="course-card__btn">View Details</Link>
            </div>
        </div>
    );
}

export default CourseCard;