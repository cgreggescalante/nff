// import firebase from 'firebase/compat';
// import { pubsub } from 'firebase-functions';
// import { firestore } from 'firebase-admin';
//
// const db = firebase.firestore();
//
// export const generateLeaderboard = pubsub
//   .schedule('0 0 * * *')
//   .onRun(async (context) => {
//     // Determine what groups to make leaderboards for
//     // Every active event, overall leaderboard
//     const today = firestore.Timestamp.now();
//     const activeEvents = await db
//       .collection('events')
//       .where('startDate', '<=', today)
//       .where('endDate', '>=', today).get();
//
//     // For each event, generate a leaderboard
//     const leaderboardPromises = activeEvents.docs.map(async (event) => {
//       // Get all users for this event
//
//     });
//     await Promise.all(leaderboardPromises);
// }
