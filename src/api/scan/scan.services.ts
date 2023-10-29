import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import config from "../../config";


export const handleScan = async ( id: string, name: string): Promise<unknown> => {
    const collection = (await database()).collection(config.collectionName);
    const person = await collection.findOne({ _id: new ObjectId(id), name });
    if(!person) {
        throw new Error('Person not found')
    }
    if (person.currentCount < person.maxCount) {
        await collection.updateOne({ _id: new ObjectId(id), name }, { $inc: { currentCount: 1 } });
        return { allowed: true, currentCount: person.currentCount, maxCount: person.maxCount }
    } else if (person.currentCount === person.maxCount) {
        return { allowed: false, currentCount: person.currentCount, maxCount: person.maxCount }
    }
};

export const handleScanAllowMore = async ( id: string, name: string, hostName: string): Promise<unknown> => {
    const collection = (await database()).collection(config.collectionName);
    const person = await collection.findOne({ _id: new ObjectId(id), name });
    if(!person) {
        throw new Error('Person not found')
    }
    if (person.currentCount < person.maxCount) {
        await collection.updateOne({ _id: new ObjectId(id), name }, { $inc: { currentCount: 1 } });
        return { allowed: true, currentCount: person.currentCount, maxCount: person.maxCount }
    } else if (person.currentCount === person.maxCount) {
        await collection.updateOne({ _id: new ObjectId(id), name }, { $inc: { currentCount: 1, maxCount: 1 }});
        await collection.updateOne({ _id: new ObjectId(id), name }, { $push: {permission: hostName}});
        return { allowed: true, currentCount: person.currentCount+1, maxCount: person.maxCount+1 }
    }
}

export const handleScanIgnore = async ( id: string, name: string): Promise<void> => {
    const collection = (await database()).collection(config.collectionName);
    const person = await collection.findOne({ _id: new ObjectId(id), name });
    if(!person) {
        throw new Error('Person not found')
    }
    collection.updateOne({ _id: new ObjectId(id), name }, { $set: { isRequesting: true } });
    return;
}