import { Link } from 'react-router-dom';
import './about.css';

function About() {
    const instructors = [
        {
            name: 'Sarah Jenkins',
            role: 'Lead Frontend Architect',
            bio: 'Ex-Google Tech Lead with 10+ years specializing in modern React, Web Performance, and UI Systems.',
            avatar: '👩‍💻'
        },
        {
            name: 'David Chen',
            role: 'Backend & Cloud Systems Expert',
            bio: 'Distributed systems engineer focused on Node.js, MongoDB, microservices, and Docker infrastructure.',
            avatar: '👨‍💻'
        },
        {
            name: 'Elena Rostova',
            role: 'Full Stack Engineering Mentor',
            bio: 'Former senior developer at Stripe. Passionate about teaching clean code architecture and TypeScript.',
            avatar: '👩‍🏫'
        }
    ];

    return (
        <div className="about-page page-enter">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="about-hero__inner">
                    <span className="about-hero__badge">Empowering Global Developers</span>
                    <h1>Our Mission: Make Premium Tech Education <span className="text-accent">Accessible</span></h1>
                    <p>
                        At CourseX, we believe anyone with dedication can master software development. 
                        We build curriculum focused on practical projects, real code, and direct industry relevance.
                    </p>
                </div>
            </div>

            <div className="about-container">
                {/* Core Values */}
                <section className="about-section">
                    <h2 className="about-section__title text-center">Core Platform Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🎯</div>
                            <h3>Industry Relevance</h3>
                            <p>We update our courses continuously so you learn today's tools, not yesterday's frameworks.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">💡</div>
                            <h3>Learn by Building</h3>
                            <p>No fluff theory. Every course guides you through building actual full-stack applications.</p>
                        </div>

                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3>Supportive Community</h3>
                            <p>Connect with fellow learners, get answers to your code questions, and grow together.</p>
                        </div>
                    </div>
                </section>

                {/* Meet Instructors */}
                <section className="about-section">
                    <h2 className="about-section__title text-center">Meet Our Lead Instructors</h2>
                    <div className="instructors-grid">
                        {instructors.map((ins, idx) => (
                            <div key={idx} className="instructor-profile-card">
                                <div className="instructor-avatar-large">{ins.avatar}</div>
                                <h3>{ins.name}</h3>
                                <span className="instructor-role-tag">{ins.role}</span>
                                <p>{ins.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="about-cta">
                    <h2>Ready to Join 50,000+ Learners?</h2>
                    <p>Start exploring our catalog today and take the next step in your career.</p>
                    <Link to="/courses" className="about-cta-btn">Browse All Courses</Link>
                </section>
            </div>
        </div>
    );
}

export default About;