import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';

export const handleGetList = async (): Promise<unknown> => {
    const collection = (await database()).collection('october-test');
    const people = await collection.find({isRequesting: true}, {projection: {name: 1, year: 1, domain: 1, currentCount:1}}).toArray();
    return people;
};

export const handleListAllow = async (id: string, name: string): Promise<void> => {
    const collection = (await database()).collection('october-test');
    const person = await collection.findOne({ _id: new ObjectId(id), name });
    if (!person) {
        throw new Error('Person not found');
    }
    await collection.updateOne({ _id: new ObjectId(id), name }, { $set: { isRequesting: false }, $inc: { maxCount: 1 }, $push: { persimmions: name } });
    return;
};

export const handleListDeny = async (id: string, name: string): Promise<void> => {
    const collection = (await database()).collection('october-test');
    const person = await collection.findOne({ _id: new ObjectId(id), name });
    if (!person) {
        throw new Error('Person not found');
    }
    await collection.updateOne({ _id: new ObjectId(id), name }, { $set: { isRequesting: false } });
    return;
};