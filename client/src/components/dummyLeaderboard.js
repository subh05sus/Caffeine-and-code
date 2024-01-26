// // Leaderboard.js

// import React, { useState, useEffect } from "react";
// import "./Leaderboard.css";
// import firstIcon from "./assets/first-icon.svg";
// import secondIcon from "./assets/second-icon.svg";
// import thirdIcon from "./assets/third-icon.svg";
// import Lottie from "react-lottie";
// import animationData from "./loading.json";
// import { initializeApp } from "firebase/app";
// import { getFirestore, getDocs, collection, orderBy, limit, query } from "@firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyAL9WJcZf3kLSUKEawrFFpR5GTegi-HlDw",
//   authDomain: "aarogyadisha-fb7b9.firebaseapp.com",
//   projectId: "aarogyadisha-fb7b9",
//   storageBucket: "aarogyadisha-fb7b9.appspot.com",
//   messagingSenderId: "718145025164",
//   appId: "1:718145025164:web:4b0d332f599e65ea83f7a9",
//   measurementId: "G-W2SCDZSL7N",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// const Leaderboard = () => {
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   useEffect(() => {
//     async function fetchLeaderboard() {
//       try {
//         const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
//         const projectsSnapshot = await getDocs(q);
//         const projectsData = projectsSnapshot.docs.map((doc) => doc.data());
//         setLeaderboardData(projectsData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         setLoading(false);
//       }
//     }

//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard-container">
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <h1>Leaderboard</h1>
//       </div>
//       {loading ? (
//         <Lottie options={defaultOptions} height={400} width={400} />
//       ) : (
//         <div className="leaderboard-list">
//           {leaderboardData.map((entry, index) => (
//             <div key={index} className="leaderboard-item">
//               <div className="position">
//                 {index === 0 && (
//                   <img className="iconsRank" src={firstIcon} alt="1st place" />
//                 )}
//                 {index === 1 && (
//                   <img className="iconsRank" src={secondIcon} alt="2nd place" />
//                 )}
//                 {index === 2 && (
//                   <img className="iconsRank" src={thirdIcon} alt="3rd place" />
//                 )}
//                 {index > 2 && index + 1}
//               </div>{" "}
//               <div className="name">{entry.name}</div>
//               <div className="score">{entry.score}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;