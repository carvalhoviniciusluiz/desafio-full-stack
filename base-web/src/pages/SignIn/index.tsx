import React from 'react';
import Form from '../../components/Form';
import Profitfyme from '../../components/Profitfyme';
import Input from '../../components/Shared/Fields/Input';

import { LogoWrap, SubmitBtn } from './styles';

import EmailIcon from '../../assets/images/email.svg';
import UnlockIcon from '../../assets/images/unlock.svg';
import SendIcon from '../../assets/images/send.svg';

const SignIn: React.FC = () => {
  return (
    <Profitfyme>
      <LogoWrap>
        <Profitfyme.Logo />
      </LogoWrap>

      <Form>
        <Form.Header>Insira suas credenciais</Form.Header>

        <Input placeholder="Email Pessoal" icon={EmailIcon} />
        <Input type="password" placeholder="Senha" icon={UnlockIcon} />

        <SubmitBtn>
          <img src={SendIcon} alt="submit"/>
          Logar
        </SubmitBtn>
      </Form>

      <Form.Footer>
        <Form.Link to="/recover">Esqueceu sua senha?</Form.Link>
        <Form.Link to="/signup">Registrar</Form.Link>
      </Form.Footer>
    </Profitfyme>
  );
}

export default React.memo(SignIn);
