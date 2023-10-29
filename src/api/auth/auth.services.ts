
import database from '../../loaders/mongo';
// import bcrypt;
import generateToken from '../../shared/jwt';
import config from "../../config";


export const handleSignupUser = async (name: string, email: string, password: string, year: number, domain: string, role: string): Promise<unknown> => {
  const collection = (await database()).collection(config.collectionName);
  const exists = await collection.findOne({ email });
  if (exists) {
    throw { statusCode: 401, message: 'Email Already exists'};
  }
  const data = await collection.insertOne({
    name,
    email,
    password,
    year,
    domain,
    role,
    currentCount: 0,
    maxCount: year,
    host: false,
  });
  return data;
};

export const handleLoginUser = async (email: string, password: string): Promise<unknown> => {
  const data = await (await database()).collection(config.collectionName).findOne({ email });
  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exist' };
  }

  // const res = await bcrypt.compare(password, data.password);
  
  if (data.password !== password) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }

  return { id: data._id, token: generateToken(email)};
};