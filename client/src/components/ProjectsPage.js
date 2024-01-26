import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "./loading.json";
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "@firebase/firestore/lite";
import CardSpotlightEffect from "./CardSpotlightEffect";
import Skeleton from "react-loading-skeleton"; // Import the skeleton library

const firebaseConfig = {
  apiKey: "AIzaSyAL9WJcZf3kLSUKEawrFFpR5GTegi-HlDw",
  authDomain: "aarogyadisha-fb7b9.firebaseapp.com",
  projectId: "aarogyadisha-fb7b9",
  storageBucket: "aarogyadisha-fb7b9.appspot.com",
  messagingSenderId: "718145025164",
  appId: "1:718145025164:web:4b0d332f599e65ea83f7a9",
  measurementId: "G-W2SCDZSL7N",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    // Fetch projects directly from Firebase
    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container">
      <p style={{ fontSize: "15px", marginBottom: "15px" }}>
        <h2 style={{ marginTop: 0 }}>Projects</h2>
        Have an open-source project you'd like to showcase? Submit your project
        details and let the community discover and contribute to your work.
        <a href="/">
          <b>
            <span className="titleB"> Add your project</span>
          </b>
        </a>
      </p>
      {loading ? (
        <div className="skeleton-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSpotlightEffect>
              <div key={index} className="skeleton-card">
                <div className="skeleton-gradient" />
                <Skeleton height={150} />
                <Skeleton
                  height={15}
                  width={100}
                  style={{ marginTop: "10px" }}
                />
                <Skeleton height={80} style={{ marginTop: "10px" }} />
              </div>
            </CardSpotlightEffect>
          ))}
        </div>
      ) : (
        <div>
          <div className="projects-grid">
            {projects.map((project) => (
              <CardSpotlightEffect key={project.projectID}>
                <div className="project-card">
                  <div>
                    <h3>
                      <a href={project.githubRepo}>{project.projectName}</a>
                    </h3>
                    <p className="projDesc">
                      {project.projectDescription.length > 100
                        ? project.projectDescription.slice(0, 100) + "..."
                        : project.projectDescription}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {project.techStacks.map((stack) => (
                        <div className="stack-span" key={stack}>
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleProjectClick(project)}
                      className="seeMoreButton"
                    >
                      See More >
                    </button>
                  </div>
                </div>
              </CardSpotlightEffect>
            ))}
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>{selectedProject.projectName}</h2>
              <button className="close-btn" onClick={handleClosePopup}>
                Close
              </button>
            </div>
            <div className="popup-body">
              <div
                className="stack-list"
                style={{
                  maxWidth: "30%",
                }}
              >
                <h3>Tech Stack</h3>
                <ul>
                  {selectedProject.techStacks.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="project-details">
                <div>
                  <h3>Project Details</h3>
                  <p className="projectDesciptionFull">
                    {selectedProject.projectDescription}
                  </p>
                </div>
                <div>
                  <p className="adminProject">
                    Project Admin: {selectedProject.adminName}
                  </p>
                  <div className="admin-links" style={{ marginTop: "10px" }}>
                    {selectedProject.adminGithub && (
                      <a
                        href={selectedProject.adminGithub}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {selectedProject.adminTwitter && (
                      <a
                        href={selectedProject.adminTwitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {selectedProject.adminLinkedIn && (
                      <a
                        href={selectedProject.adminLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {selectedProject.adminPortfolio && (
                      <a
                        href={selectedProject.adminPortfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
