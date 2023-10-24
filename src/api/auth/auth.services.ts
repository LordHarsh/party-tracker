import database from '../../loaders/mongo';
import generateToken from '../../shared/jwt';


export const handleLoginUser = async (email: string, password: string): Promise<unknown> => {
  const data = await (await database()).collection('october-test').findOne({ email });
  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exist' };
  }

  //const res = await bcrypt.compare(password, data.password);
  
  if (data.password !== password) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }

  return { id: data._id, token: generateToken(email)};
};