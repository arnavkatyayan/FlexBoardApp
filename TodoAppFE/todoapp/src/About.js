import React from "react";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

function About() {
    const [video, setVideo] = useState("");
    const videos = [
        "https://youtu.be/ptD0T-ZcF2M?si=eDHFitspfs5gFWhp", // Steve Jobs - The Rules for Success
        "https://youtu.be/UNQhuFL6CWg", // The 5 AM Club - Why Waking Up Early is Life-Changing
        "https://youtu.be/ZsYwFvC2g0A", // The Science of Productivity by ASAPScience
        "https://youtu.be/2lAe1cqCOXo", // Why Do We Procrastinate? (Ted-Ed)
        "https://youtu.be/bj8d2Ehb1N4", // How To Stop Wasting Time - James Clear (Atomic Habits)
        "https://youtu.be/V2PP3p4_4R8", // 10x Your Productivity (Deep Work by Cal Newport)
        "https://youtu.be/VSceuiPBpxY?si=vrkYX5WQ04jSRZIo"
    ];

    useEffect(() => {
        const num = Math.floor(Math.random() * videos.length); // Corrected random index generation
        setVideo(videos[num]);
    }, []);
    return (
        <div className="about-page">
            {/* Grid container for about text */}
            <div className="about-grid">
                <p className="about-text">
                    FlexBoard helps you organize your work seamlessly by allowing you to create,
                    track, and prioritize tasks efficiently. Whether you're managing personal projects
                    or collaborating with a team, our intuitive interface makes it easy.
                </p>
                <p className="about-text">
                    Stay on top of your projects with customizable boards, progress tracking, and deadline reminders.
                    FlexBoard empowers you to break down tasks into manageable steps, ensuring nothing falls through the cracks.
                </p>
                <p className="about-text">
                    Work smarter with team collaboration features, where you can assign tasks, share updates,
                    and integrate with tools like Slack, Google Calendar, and Notion.
                </p>
                <p className="about-text">
                    Enhance your productivity with real-time notifications and seamless communication.
                    Stay in sync with your team, anytime, anywhere.
                </p>
            </div>

            {/* Video Player Section */}
            <div className="video-container">
                <ReactPlayer
                    url={video}
                    controls
                    width="640px"
                    height="360px"
                    playing={false}
                />
            </div>
            <div className="demo-section">
                <h6 className="contact-demo-page">📞 Contact for Demo!</h6>
                <div className="contact-info">
                    <p>📧 Email: <a href="mailto:arnavkatyayan99@gmail.com">arnavkatyayan99@gmail.com</a></p>
                    <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/arnav-katyayan/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/arnav-katyayan/</a></p>
                    <p>📱 Phone: <a href="tel:+918851454409">+918851454409</a></p>
                </div>
            </div>
        </div>
    );

} export default About;

