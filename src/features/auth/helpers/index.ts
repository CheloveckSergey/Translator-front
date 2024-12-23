export type PasswordReliability = 'low' | 'normal' | 'high';

function validation(
  login: string, 
  password: string, 
  confirmPassword: string, 
  setEMessage: (message: string) => void,
): boolean {
  if (login.length < 5 || login.length > 15) {
    setEMessage('Логин должен быть не меньше 5 и небольше 15 символов');
    return false;
  }
  if (password.length < 7 || password.length > 15) {
    setEMessage('Пароль должен быть не меньше 7 и небольше 15 символов');
    return false;
  }
  if (password !== confirmPassword) {
    setEMessage('Пароли должны совпадать');
    return false;
  }
  return true;
}

function getPasswordReliability(password: string): PasswordReliability | undefined {
  if (password.length === 0) {
    return undefined
  }
  if ((password.length < 7) || (password.length > 15)) {
    return 'low';
  } else if ((password.length >=7) && (password.length <=10)) {
    return 'normal';
  } else {
    return 'high';
  }
}

export const AuthHelpers = {
  validation,
  getPasswordReliability,
}