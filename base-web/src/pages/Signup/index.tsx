import React from 'react';
import { useMutation } from 'react-query';
import Form from '../../components/Form';
import Profitfyme from '../../components/Profitfyme';
import Input from '../../components/Shared/Fields/Input';

import { LogoWrap, Term, SubmitBtn } from './styles';

import UserIcon from '../../assets/images/user.svg';
import UserCircleIcon from '../../assets/images/user-circle.svg';
import EmailIcon from '../../assets/images/email.svg';
import BrandBrIcon from '../../assets/images/brand-br.svg';
import UnlockIcon from '../../assets/images/unlock.svg';
import SendIcon from '../../assets/images/send.svg';

import { ActionTypes, useAuth } from '../../providers/Auth/useAuth';
import userService from '../../services/user';
import { User } from '../../interfaces/models/user.interface';
import { SIGN_IN } from '../../constants/routes';
import { useHistory } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [state, dispatch] = useAuth();

  const history = useHistory();

  const hasRequiredFields = React.useMemo(() => {
    return !!state.user?.firstname
      && !!state.user?.lastname
      && !!state.user?.email;
  }, [state.user?.firstname, state.user?.lastname, state.user?.email]);

  const verifiedPasswords = React.useMemo(() => {
    return !!state.password?.current && (
      state.password?.current === state.password?.confirmation
    );
  }, [state.password]);

  React.useEffect(() => {
    return () => {
      dispatch({ type: ActionTypes.SET_INITIAL_STATE });
    }
  }, [dispatch]);

  const [mutate, { status }] = useMutation(
    () => userService.save(
      state.user as User,
      state.password?.current as string,
      state.password?.confirmation as string
    )
  );

  React.useEffect(() => {
    if (status === 'success') {
      history.push(SIGN_IN);
    }
  }, [status, history])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasRequiredFields && verifiedPasswords) {
      await mutate()
    }
  }

  return (
    <Profitfyme>
      <LogoWrap>
        <Profitfyme.Logo />
      </LogoWrap>

      <Form onSubmit={handleSubmit}>
        <Form.Header>Informe seus dados</Form.Header>

        <Input
          placeholder="Nome"
          icon={UserIcon}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: ActionTypes.SET_USER,
              user: {
                ...state.user,
                firstname: event.currentTarget.value,
              },
            });
          }}
        />

        <Input
          placeholder="Sobrenome"
          icon={UserCircleIcon}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: ActionTypes.SET_USER,
              user: {
                ...state.user,
                lastname: event.currentTarget.value,
              },
            });
          }}
        />

        <Input
          placeholder="Email Pessoal"
          icon={EmailIcon}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: ActionTypes.SET_USER,
              user: {
                ...state.user,
                email: event.currentTarget.value,
              },
            });
          }}
        />

        <Input placeholder="" icon={BrandBrIcon} />
        <Input
          type="password"
          placeholder="Senha"
          icon={UnlockIcon}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: ActionTypes.SET_PASSWORD,
              password: {
                ...state.password,
                current: event.currentTarget.value,
              },
            });
          }}
        />
        <Input
          type="password"
          placeholder="Confirma senha"
          icon={UnlockIcon}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: ActionTypes.SET_PASSWORD,
              password: {
                ...state.password,
                confirmation: event.currentTarget.value,
              },
            });
          }}
        />

        <Term>
          Ao se cadastrar você automaticamente concorda com nossos <a href="#/">Termos de Uso</a>
        </Term>

        <SubmitBtn isActive={hasRequiredFields && verifiedPasswords}>
          <img src={SendIcon} alt="submit"/>
          Cadastrar
        </SubmitBtn>
      </Form>

      <Form.Footer>
        <Form.Link to="/recover">Esqueceu sua senha?</Form.Link>
        <Form.Link to="/signin">Entrar</Form.Link>
      </Form.Footer>
    </Profitfyme>
  );
}

export default React.memo(SignUp);
