import React, { useState, useEffect } from "react";
import TypeWriterEffect from "./TypeWriterEffect";

function InfoPage() {
  const [feature, setFeature] = useState("");
  const features = [
    "Create Todos for your productivity",
    "Assign Tasks to your friends",
    "Save it Locally efficiently",
    "Sync tasks across multiple devices",
    "Set deadlines and reminders",
    "Collaborate with teammates in real-time",
    "Organize tasks with categories and labels",
    "Track progress with visual charts",
    "Attach notes and files to tasks",
    "Get daily and weekly task summaries",
    "Enable dark mode for a better UI experience",
    "Customize themes and layouts",
    "Integrate with Google Calendar",
    "Export tasks as PDF or CSV",
    "Use keyboard shortcuts for faster navigation",
    "Enable voice input for quick task creation",
    "Receive smart suggestions for task prioritization",
    "Add recurring tasks with custom schedules"
  ];

  // Function to update the feature randomly
  const getNextFeature = () => {
    const rand = Math.floor(Math.random() * features.length);
    setFeature(features[rand]);
  };

  // Select initial feature on mount
  useEffect(() => {
    getNextFeature();
  }, []);

  return (
    <div>
      <TypeWriterEffect word={feature} onComplete={getNextFeature} />
    </div>
  );
}

export default InfoPage;