import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import './styles.scss';
import { useAppDispatch, useAppSelector } from "../../app/store";
import { MyRejectValue, authThunks } from "../../features/auth/model/store";
import { useNavigate } from "react-router-dom";
import { SharedButtons } from "../../shared/sharedUi/buttons";
import { SharedInputs } from "../../shared/sharedUi/inputs";
import { SharedBlocks } from "../../shared/sharedUi/blocks";
import { AuthHelpers } from "../../features/auth";

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
    .then(() => {
      navigate('/home');
    })
    .catch((error: MyRejectValue) => {
      if (error.message) {
        setErrorMessage(error.message);
      }
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (AuthHelpers.validation(login, password, confirmPassword, setErrorMessage)) {
      registration();
    }
  }

  return (
    <>
      <h1>Registration</h1>
      <div className="login-password">
        <form
          onSubmit={submit}
        >
          <div className="input-block">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              name="login"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLogin(e.target.value);
                setErrorMessage('');
              }}
              className="login"
            />
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              type="password" 
              name="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setPassword(e.target.value);
                setErrorMessage('');
              }}
              className={['password', AuthHelpers.getPasswordReliability(password)].join(' ')}
            />
          </div>
          <div className="input-block">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password" 
              name="confirm-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setConfirmPassword(e.target.value);
                setErrorMessage('');
              }}
              className="confirm-password"
            />
          </div>
          <SharedInputs.CustomSubmit
            body='Registration'
            color="green"
            className="submit"
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

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  function log() {
    dispatch(authThunks.loginThunk({login, password}))
    .unwrap()
    .then(() => {
      navigate('/home');
    })
    .catch((error: MyRejectValue) => {
      setErrorMessage(error.message);
    });
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    log();
  }

  return (
    <>
      <h1>Login</h1>
      <div className="login-password">
        <form
          onSubmit={submit}
        >
          <div className="input-block">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              name="login"
              autoComplete="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setLogin(e.target.value);
                setErrorMessage('');
              }}
              className="login"
            />
          </div>
          <div className="input-block">
            <label htmlFor="password">Password</label>
            <input
              type="password" 
              name="password"
              autoComplete="current-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => { 
                setPassword(e.target.value);
                setErrorMessage('');
              }}
              className="password"
            />
          </div>
          <SharedInputs.CustomSubmit
            body={'Login'}
            color="green"
            ref={ref}
            className="submit"
          />
        </form>
        <div className="error-message">{errorMessage}</div>
      </div>
    </>
  ) 
}

export const AuthPage: FC = () => {
  const { loading } = useAppSelector(state => state.user);

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
        <SharedBlocks.BlackoutLoader
          isLoading={loading}
          iconSize={50}
        />
      </div>
    </div>
  )
}