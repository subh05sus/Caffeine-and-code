const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const serviceAccount = require('./secret.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = 5000;
app.use(cors());

// Existing /all endpoint to fetch projects
app.get('/all', async (req, res) => {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    const projects = [];

    projectsSnapshot.forEach((doc) => {
      const projectData = doc.data();
      const project = {
        projectID: projectData.projectID,
        projectName: projectData.projectName,
        projectDescription: projectData.projectDescription,
        techStacks: projectData.techStacks,
        adminName: projectData.adminName,
        adminDetails: projectData.adminDetails,
        githubRepo: projectData.githubRepo,
        adminGithub: projectData.adminGithub,
        adminTwitter: projectData.adminTwitter,
        adminLinkedIn: projectData.adminLinkedIn,
        adminPortfolio: projectData.adminPortfolio,
      };
      projects.push(project);
    });

    res.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboardSnapshot = await db.collection('scores').orderBy('score', 'desc').limit(10).get();
    const leaderboard = [];

    leaderboardSnapshot.forEach((doc) => {
      const scoreData = doc.data();
      const entry = {
        name: scoreData.name,
        score: scoreData.score,
      };
      leaderboard.push(entry);
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// -------------------------------------------------------------------------------------------------------------------------
// // Dummy projects
// const dummyProjects = [
//     {
//       projectID: 'project1',
//       projectName: 'Awesome Project 1',
//       projectDescription: 'Description for Awesome Project 1',
//       techStacks: ['React', 'Node.js', 'Firebase'],
//       adminName: 'Admin 1',
//      adminDetails: "He is a student",
//       githubRepo: 'https://github.com/project1',
//       adminGithub: 'https://github.com/admin1',
//       adminTwitter: 'https://twitter.com/admin1',
//       adminLinkedIn: 'https://linkedin.com/in/admin1',
//       adminPortfolio: 'https://admin1portfolio.com',
//     },
//     {
//       projectID: 'project2',
//       projectName: 'Cool Project 2',
//       projectDescription: 'Description for Cool Project 2',
//       techStacks: ['Angular', 'Express', 'MongoDB'],
//       adminName: 'Admin 2',
//      adminDetails: "He is a student",
//       githubRepo: 'https://github.com/project2',
//       adminGithub: 'https://github.com/admin2',
//       adminTwitter: 'https://twitter.com/admin2',
//       adminLinkedIn: 'https://linkedin.com/in/admin2',
//       adminPortfolio: 'https://admin2portfolio.com',
//     },
//     {
//       projectID: 'project3',
//       projectName: 'Innovative Chat Platform',
//       projectDescription: 'Revolutionize communication with our cutting-edge chat platform. This platform provides a seamless and secure messaging experience for users, ensuring real-time communication with advanced features such as file sharing, voice messages, and message encryption. Collaborate effortlessly with your team or connect with friends in style.',
//       techStacks: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'GraphQL', 'AWS S3'],
//       adminName: 'Admin 3',
//       adminDetails: "She is an experienced software developer passionate about creating impactful solutions.",
//       githubRepo: 'https://github.com/project3',
//       adminGithub: 'https://github.com/admin3',
//       adminTwitter: 'https://twitter.com/admin3',
//       adminLinkedIn: 'https://linkedin.com/in/admin3',
//       adminPortfolio: 'https://admin3portfolio.com',
//     },
//     {
//       projectID: 'project4',
//       projectName: 'Eco-Friendly Travel App',
//       projectDescription: 'Embark on eco-conscious journeys with our travel app designed to minimize the environmental impact of your adventures. Discover sustainable travel options, eco-friendly accommodations, and carbon offset programs. The app also provides users with personalized eco-tips and tracks their carbon footprint, fostering a greener approach to exploration.',
//       techStacks: ['Vue.js', 'Django', 'PostgreSQL', 'Leaflet.js', 'Firebase'],
//       adminName: 'Admin 4',
//       adminDetails: "He is an environmental enthusiast and a full-stack developer dedicated to creating positive change through technology.",
//       githubRepo: 'https://github.com/project4',
//       adminGithub: 'https://github.com/admin4',
//       adminTwitter: 'https://twitter.com/admin4',
//       adminLinkedIn: 'https://linkedin.com/in/admin4',
//       adminPortfolio: 'https://admin4portfolio.com',
//     },
//     {
//       projectID: 'project5',
//       projectName: 'Virtual Fitness Trainer',
//       projectDescription: 'Get fit from the comfort of your home with our virtual fitness trainer app. Experience personalized workout routines and real-time feedback from virtual trainers. The app utilizes augmented reality (AR) for interactive workouts, tracks your progress, and integrates with wearables for a comprehensive fitness experience.',
//       techStacks: ['Flutter', 'Express.js', 'TensorFlow', 'MongoDB', 'ARKit', 'Google Fit API'],
//       adminName: 'Admin 5',
//       adminDetails: "She is a fitness enthusiast and a tech-savvy developer committed to bringing innovation to the fitness industry.",
//       githubRepo: 'https://github.com/project5',
//       adminGithub: 'https://github.com/admin5',
//       adminTwitter: 'https://twitter.com/admin5',
//       adminLinkedIn: 'https://linkedin.com/in/admin5',
//       adminPortfolio: 'https://admin5portfolio.com',
//     },
//     {
//       projectID: 'project6',
//       projectName: 'Smart Home Automation System',
//       projectDescription: 'Transform your living space into a smart home with our automation system. Control lights, temperature, security systems, and more through a centralized app. The system integrates with IoT devices, learns user preferences, and adapts to create a personalized and energy-efficient living environment.',
//       techStacks: ['React Native', 'Node.js', 'MQTT', 'Raspberry Pi', 'Firebase', 'Home Assistant'],
//       adminName: 'Admin 6',
//       adminDetails: "He is an IoT enthusiast and software engineer passionate about creating intelligent and user-friendly solutions.",
//       githubRepo: 'https://github.com/project6',
//       adminGithub: 'https://github.com/admin6',
//       adminTwitter: 'https://twitter.com/admin6',
//       adminLinkedIn: 'https://linkedin.com/in/admin6',
//       adminPortfolio: 'https://admin6portfolio.com',
//     },
  
//     {
//       projectID: 'project7',
//       projectName: 'Foodie Social Network',
//       projectDescription: 'Connect with fellow foodies and explore the culinary world through our social network. Share recipes, restaurant reviews, and cooking tips. The app incorporates AI-driven recipe recommendations based on user preferences and offers a platform for food enthusiasts to build a vibrant community.',
//       techStacks: ['Angular', 'Spring Boot', 'MySQL', 'Elasticsearch', 'AWS Lambda', 'OAuth 2.0'],
//       adminName: 'Admin 7',
//       adminDetails: "She is a food blogger and software developer with a passion for combining technology with culinary experiences.",
//       githubRepo: 'https://github.com/project7',
//       adminGithub: 'https://github.com/admin7',
//       adminTwitter: 'https://twitter.com/admin7',
//       adminLinkedIn: 'https://linkedin.com/in/admin7',
//       adminPortfolio: 'https://admin7portfolio.com',
//     },
  
//     {
//       projectID: 'project8',
//       projectName: 'Virtual Event Platform',
//       projectDescription: 'Host and attend virtual events seamlessly with our platform. From conferences to social gatherings, the platform supports live streaming, interactive Q&A sessions, and networking opportunities. Integrated analytics provide event organizers with insights to enhance future virtual experiences.',
//       techStacks: ['Vue.js', 'Express.js', 'WebRTC', 'MongoDB', 'Socket.io', 'AWS'],
//       adminName: 'Admin 8',
//       adminDetails: "He is an event management professional and software engineer dedicated to creating engaging virtual experiences.",
//       githubRepo: 'https://github.com/project8',
//       adminGithub: 'https://github.com/admin8',
//       adminTwitter: 'https://twitter.com/admin8',
//       adminLinkedIn: 'https://linkedin.com/in/admin8',
//       adminPortfolio: 'https://admin8portfolio.com',
//     },
  
//     {
//       projectID: 'project9',
//       projectName: 'Mental Health Wellness App',
//       projectDescription: 'Prioritize mental well-being with our wellness app. Access guided meditation, mood tracking, and mental health resources. The app offers a supportive community, anonymous peer-to-peer chat, and personalized self-care plans. Empower users to take control of their mental health journey.',
//       techStacks: ['React Native', 'Django', 'SQLite', 'Redux', 'WebSockets', 'Firebase'],
//       adminName: 'Admin 9',
//       adminDetails: "She is a mental health advocate and software developer committed to leveraging technology for positive mental health outcomes.",
//       githubRepo: 'https://github.com/project9',
//       adminGithub: 'https://github.com/admin9',
//       adminTwitter: 'https://twitter.com/admin9',
//       adminLinkedIn: 'https://linkedin.com/in/admin9',
//       adminPortfolio: 'https://admin9portfolio.com',
//     },
  
//     {
//       projectID: 'project10',
//       projectName: 'Augmented Reality Museum Guide',
//       projectDescription: 'Enhance museum visits with our AR guide. The app overlays information, stories, and interactive elements on exhibits, providing a captivating and educational experience. Users can explore historical artifacts in a new light, with virtual guides offering insights and multimedia content.',
//       techStacks: ['Unity', 'ARCore', 'C#', 'Firebase', 'GraphQL', '3D Modeling'],
//       adminName: 'Admin 10',
//       adminDetails: "He is an AR enthusiast and game developer passionate about creating immersive experiences that blend education and entertainment.",
//       githubRepo: 'https://github.com/project10',
//       adminGithub: 'https://github.com/admin10',
//       adminTwitter: 'https://twitter.com/admin10',
//       adminLinkedIn: 'https://linkedin.com/in/admin10',
//       adminPortfolio: 'https://admin10portfolio.com',
//     },
  
//     // Add more dummy projects as needed
//   ];
  
// //   // Add dummy projects to Firestore
//   dummyProjects.forEach(async (project) => {
//     try {
//       await db.collection('projects').doc(project.projectID).set(project);
//       console.log(`Project "${project.projectName}" added to Firestore.`);
//     } catch (error) {
//       console.error('Error adding project to Firestore:', error);
//     }
//   });














// // Firestore collection name
// const collectionName = 'scores';

// // Sample array of people with names and scores
// const peopleScores = [
//   { name: 'John', score: 85 },
//   { name: 'Jane', score: 92 },
//   { name: 'Bob', score: 78 },
//   { name: 'Alice', score: 88 },
//   { name: 'Charlie', score: 95 },
//   { name: 'David', score: 80 },
//   { name: 'Eva', score: 89 },
//   { name: 'Frank', score: 75 },
//   { name: 'Grace', score: 93 },
//   { name: 'Harry', score: 87 },
//   { name: 'Ivy', score: 82 },
//   { name: 'Jack', score: 91 },
//   { name: 'Kelly', score: 84 },
//   { name: 'Leo', score: 96 },
//   { name: 'Mia', score: 79 },
//   { name: 'Nathan', score: 94 },
//   { name: 'Olivia', score: 86 },
//   { name: 'Peter', score: 77 },
//   { name: 'Quinn', score: 98 },
//   { name: 'Riley', score: 83 },
// ];


// // Upload data to Firestore
// const uploadDataToFirestore = async () => {
//   const db = admin.firestore();

//   try {
//     const batch = db.batch();

//     // Create a document for each person in the collection
//     peopleScores.forEach((person) => {
//       const docRef = db.collection(collectionName).doc();
//       batch.set(docRef, person);
//     });

//     // Commit the batch
//     await batch.commit();

//     console.log('Data uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading data to Firestore:', error);
//   }
// };

// // Call the function to upload data
// uploadDataToFirestore();