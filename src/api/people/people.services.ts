import { ObjectId } from 'mongodb';
import databse from '../../loaders/mongo';

export const handleGetCount = async (_id: string): Promise<unknown> => {
    const collection = (await databse()).collection('peoples');
    const person = await collection.findOne({ _id: new ObjectId(_id) });
    if (!person){
        throw new Error('Person not found');
    }
    if (!person.count){
        return 0;
    }
    return person.count;
};

export const handleAllow = async (_id: string): Promise<unknown> => {
    const collection = (await databse()).collection('peoples');
    const person = await collection.findOne({ _id: new ObjectId(_id) });
    if (!person){
        throw new Error('Person not found');
    }
    if (!person.count){
        person.count = 1;
    } else {
        person.count++;
    }
    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: person });
    return person.count;
};