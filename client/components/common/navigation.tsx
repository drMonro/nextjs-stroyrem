import {Affix, Button, Col, Layout, Menu, Row, Space} from 'antd';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {device} from '../../constants/media'
import type {MenuProps} from 'antd';

const {SubMenu} = Menu;


const StyledRow = styled(Row)`
  background-color: #00408C;
  padding: 10px 50px;
  //padding-top: 20px;
  border-bottom: 5px solid #4176B5;

  .ant-menu-horizontal {
    border: none;
  }

  .ant-menu-horizontal > .ant-menu-item::after, .ant-menu-horizontal > .ant-menu-submenu::after {
    bottom: -4px;
  }

  .ant-menu-horizontal > .ant-menu-item a:hover {
    color: #82B6F4;
  }

  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after, .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
    border-bottom: 5px solid #82B6F4;
  }

  @media ${device.tablet} {
    background-color: #c22964;

  }

  .ant-menu-item a {
    color: white;
    font-size: 17px;
    font-weight: bold;
  }

  .ant-btn {
    font-size: 17px;
    line-height: 15px;
    font-weight: bold;
  }

  .ant-btn.ant-btn-text {
    color: white;
    margin-right: 20px;
  }

  .ant-btn.ant-btn-text:hover {
    color: #82B6F4;
  }

  .ant-btn.ant-btn-primary {
    background-color: #82B6F4;
    border-color: #82B6F4;
  }

  .ant-btn.ant-btn-primary:hover {
    background-color: #4176B5;
    border-color: #4176B5;
  }
`;

const items: MenuProps['items'] = [
  {
    label: (
      <Link href="/self-pickup/">
        <a>Пункт самовывоза</a>
      </Link>
    ),
    key: 'self-pickup',
  },
  {
    label: (
      <Link href="/delivery/">
        <a>Доставка</a>
      </Link>
    ),
    key: 'delivery',
  },
  {
    label: (
      <Link href="/return/">
        <a>Возврат</a>
      </Link>
    ),
    key: 'return',
  },
  {
    label: (
      <Link href="/promo/">
        <a>Акции</a>
      </Link>
    ),
    key: 'promo',
  },
  {
    label: (
      <Link href="/services/">
        <a>Услуги</a>
      </Link>
    ),
    key: 'services',
  },
];

export default function HeaderTopNavigation(): JSX.Element {

  const [current, setCurrent] = React.useState('mail');

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    // <Affix offsetTop={0}>
    <StyledRow>
      <Col span={24}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Menu style={{backgroundColor: '#00408C'}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
          <div>
            <Button type="text">Вход</Button>
            <Button type="primary">Регистрация</Button>
          </div>
        </div>
      </Col>
    </StyledRow>

    // </Affix>
  );

}
