import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Logo } from '../logo';
import { FC, memo } from 'react';
import { HeaderNav } from './header-nav/header-nav';

const HeaderComponent: FC = () => {
  const { pathname } = useLocation();
  const isActive = pathname === String(AppRoute.Main);
  const isLogin = pathname.startsWith(AppRoute.Login);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header' isActive={isActive}/>
          </div>
          {!isLogin && <HeaderNav />}
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);
