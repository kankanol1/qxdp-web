import { Button, Result } from 'antd';
import React from 'react';
import { router } from 'umi';

const NoFoundPage = () => (
  <Result
    status={404}
    title="404"
    subTitle="对不起，页面不存在."
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;
