import ILogin from '../../interfaces/ILogin';
import loginSchema from './schema';

const validateLogin = (login: ILogin) => {
  const { error } = loginSchema.validate(login);
  if (error) {
    return error.message;
  }
  return null;
};

export default validateLogin;
