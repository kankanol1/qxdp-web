import { FormattedMessage } from 'umi-plugin-react/locale';
import { Button, Result } from 'antd';
import Link from 'umi/link';
import React from 'react';
import styles from './style.less';


const actions = (
  <div className={styles.actions}>
    <Link to="/user/login">
      <Button size="large">
        <FormattedMessage id="useranduserregisterresult.register-result.back-login" />
      </Button>
    </Link>
  </div>
);

const UserRegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="useranduserregisterresult.register-result.msg"
          values={{
            email:location.state ? location.state.account : "123@qq.com",
          }}
        />
      </div>
    }
    extra={actions}
  />);

export default UserRegisterResult;
