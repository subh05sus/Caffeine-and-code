import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "./loading.json";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    fetch("http://localhost:5000/all")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClosePopup = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-container">
      {loading ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        <div>
          <p style={{ fontSize: "15px", marginBottom: "15px" }}>
            <h2 style={{ marginTop: 0 }}>Projects</h2>
            Have an open-source project you'd like to showcase? Submit your project details
            and let the community discover and contribute to your work. 
            <a href="/">
              <b>
                <span className="titleB"> Add your project</span>
              </b>
            </a>
          </p>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.projectID} className="project-card">
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
                      <div className="stack-span">{stack}</div>
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
                    {/* {selectedProject.adminDetails && (
                      <span> - {selectedProject.adminDetails}</span>
                    )} */}
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
