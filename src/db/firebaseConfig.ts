import { initializeApp } from 'firebase/app'

import { collection, getFirestore } from 'firebase/firestore'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyClyJtwp9t-AIN07BiSWsgkopJjqruLM98',
  authDomain: 'cartly-app.firebaseapp.com',
  databaseURL: 'https://cartly-app-default-rtdb.firebaseio.com',
  projectId: 'cartly-app',
  storageBucket: 'cartly-app.appspot.com',
  messagingSenderId: '564185592748',
  appId: '1:564185592748:web:c21b2d4086731a5a9e4009',
  measurementId: 'G-0SZB4HLGGT',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const ordersRef = collection(db, 'orders')

export { app, db, ordersRef }
