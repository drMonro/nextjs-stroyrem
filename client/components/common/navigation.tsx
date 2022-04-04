import {Affix, Col, Layout, Menu, Row, Space} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {device} from '../../constants/media'

const {SubMenu} = Menu;

type menuKey = {
  key: string,
}

const StyledRow = styled(Row)`
  background-color: #00408C;
  padding: 0 50px;
  
  @media ${device.laptopL} {
    background-color: red;

  }
  
  a {
    color: white;
  }
`;

export default function Navigation(): JSX.Element {

  const [currentMenuItem, setCurrentMenuItem] = useState('mail');

  const handleClick = ({key}: menuKey) => {
    setCurrentMenuItem(key);
  }

  return (
    // <Affix offsetTop={0}>
      <StyledRow>
        <Col span={24}>
          <Space size={50}>
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
            <Link href="/pokemon/bulbasaur">SSR</Link>{' '}
          </Space>
        </Col>
      </StyledRow>

    // </Affix>
  );

}
