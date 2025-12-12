import { db } from "../_utils/firebase";
import { where, collection, getDocs, addDoc, query } from "firebase/firestore";



export async function getItems(userId) {
    const q = query(
        collection(db, "users", userId, "tasks")
        //Add extra rules here later
    );

    const tasksSnapshot = await getDocs(q);

    const tasks = [];
    tasksSnapshot.forEach((doc) => {
        tasks.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return tasks;
}

export async function addTask(userId, task) {
    const colRef = collection(db, "users", userId, "tasks");
    const docRef = await addDoc(colRef, task);

    return docRef.id;
}