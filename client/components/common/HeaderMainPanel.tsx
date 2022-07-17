import {Affix, Button, Col, Layout, Menu, Row, Space} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {device} from '../../constants/media'
import type {MenuProps} from 'antd';
import Logo from '../../public/images/svg/logo.svg';

const {SubMenu} = Menu;


const StyledRow = styled(Row)`
  background-color: white;
  padding: 10px 50px;
  //border-bottom: 5px solid #4176B5;

  
`;

const StyledLogo = styled(Logo)`
  width: 250px;
`;


export default function HeaderMainPanel(): JSX.Element {

  return (
    // <Affix offsetTop={0}>
    <StyledRow>
      <Col span={24}>
        <StyledLogo/>


        {/*<div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
        {/*  <div>*/}
        {/*    <Button type="text">Вход</Button>*/}
        {/*    <Button type="primary">Регистрация</Button>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </Col>
    </StyledRow>

    // </Affix>
  );

}
