import { ChangeEvent, FC, FormEvent, useState } from "react";
import './styles.scss';
import { useAppDispatch } from "../../app/store";
import { MyRejectValue, authThunks } from "../../features/auth/model/store";
import { useNavigate } from "react-router-dom";
import { SharedButtons } from "../../shared/sharedUi/buttons";
import { SharedInputs } from "../../shared/sharedUi/inputs";

type PasswordReliability = 'low' | 'normal' | 'high';

const RegistrationBlock: FC = () => {

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function registration() {
    dispatch(authThunks.registerThunk({login, password}))
    .unwrap()
    .then((data) => {
      navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      // if (error.message) {
      //   setEMessage(error.message);
      // }
      console.log(error);
    });
  }

  function validation(
    login: string, 
    password: string, 
    confirmPassword: string, 
    setEMessage: React.Dispatch<React.SetStateAction<string>>
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

  return (
    <>
      <h1>Registration</h1>
      <div className="login-password">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (validation(login, password, confirmPassword, setErrorMessage)) {
              registration();
            }
          }}
        >
          <div className="input-block">
            <label htmlFor="login">Login</label>
            <input
              className="login"
              type="text"
              name="login"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLogin(e.target.value);
                setErrorMessage('');
              }}
            />
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              className={['password', getPasswordReliability(password)].join(' ')}
              type="password" 
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setPassword(e.target.value);
                setErrorMessage('');
              }}
            />
          </div>
          <div className="input-block">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              className="confirm-password"
              type="password" 
              name="confirm-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setConfirmPassword(e.target.value);
                setErrorMessage('');
              }}
            />
          </div>
          <SharedInputs.CustomSubmit
            className="submit"
            body={'Registration'}
            isLoading={false}
            isError={false}
            color="green"
          />
        </form>
        <div className="error-message">{errorMessage}</div>
      </div>
    </>
  )
}

const LoginBlock: FC = () => {

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function log() {
    dispatch(authThunks.loginThunk({login, password}))
    .unwrap()
    .then((data) => {
      navigate('/home');
    } )
    .catch((error: MyRejectValue) => {
      // if (error.message) {
      //   setEMessage(error.message);
      // }
      console.log(error);
    });
  }

  return (
    <>
      <h1>Login</h1>
      <div className="login-password">
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            log();
          }}
        >
          <div className="input-block">
            <label htmlFor="login">Login</label>
            <input
              className="login"
              type="text"
              name="login"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLogin(e.target.value);
                setErrorMessage('');
              }}
            />
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              className="password"
              type="password" 
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setPassword(e.target.value);
                setErrorMessage('');
              }}
            />
          </div>
          <SharedInputs.CustomSubmit
            className="submit"
            body={'Login'}
            isLoading={false}
            isError={false}
            color="green"
          />
        </form>
        <div className="error-message">{errorMessage}</div>
      </div>
    </>
  ) 
}

export const AuthPage: FC = () => {

  const [loginPage, setLoginPage] = useState<boolean>(true);

  return (
    <div className="auth-page">
      <div className="auth-content">
        {loginPage ? <LoginBlock /> : <RegistrationBlock />}
        <SharedButtons.TextButton
          body={loginPage ? 'Registration' : 'Login'}
          className="change-button"
          onClick={() => setLoginPage(!loginPage)}
          color="green"
        />
      </div>
    </div>
  )
}