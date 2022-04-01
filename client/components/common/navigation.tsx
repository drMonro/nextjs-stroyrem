import {Affix, Col, Layout, Menu, Row, Space} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const {SubMenu} = Menu;

type menuKey = {
  key: string,
}

const StyledMenu = styled(Menu)`
  background-color: #00408C;
  //font-weight: bold;
  //padding: 0 50px;
`;

export default function Navigation(): JSX.Element {

  const [currentMenuItem, setCurrentMenuItem] = useState('mail');

  const handleClick = ({key}: menuKey) => {
    setCurrentMenuItem(key);
  }

  return (
    <Affix offsetTop={0}>
      <Row>
        <Col span={24}>
          <Space size={'large'}>
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
          </Space>
        </Col>
      </Row>

    </Affix>
  );

}
