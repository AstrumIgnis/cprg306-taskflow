import { db } from "../_utils/firebase";
import { where, collection, getDocs, addDoc, query, doc, updateDoc, deleteDoc } from "firebase/firestore";



export async function getTasks(userId) {
    const q = query(
        collection(db, "users", userId, "tasks"),
        where("completed", "==", false)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data()
    }));
}

export async function completeTask(userId, firestoreId) {
    const taskRef = doc(db, "users", userId, "tasks", firestoreId);

    await updateDoc(taskRef, {
        completed: true,
        completionDate: new Date().toISOString()
    });
}

export async function getCompletedTasks(userId) {
    const q = query(
        collection(db, "users", userId, "tasks"),
        where("completed", "==", true)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data()
    }));
}

export async function addTask(userId, task) {
    const colRef = collection(db, "users", userId, "tasks");
    const docRef = await addDoc(colRef, task);

    return docRef.id;
}

export async function deleteTask(userId, taskId) {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskRef);
}