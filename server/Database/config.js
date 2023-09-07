import { connect } from 'mongoose';

const db = 'mongodb+srv://easydining:easydining2023@easydining.6caoeq2.mongodb.net/Easy-Dining';

export async function connectToDb() {
    await connect(db, {
    }).then(() => {
        console.log("connection successful");
    }).catch((err) => {
        console.log("Failed", err);
    });
}

