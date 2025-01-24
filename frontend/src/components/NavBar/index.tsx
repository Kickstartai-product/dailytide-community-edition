'use client';

import React, { memo, useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import classNames from 'classnames';
import { toggleTheme, setQueryString, setIsQueryStringChanged } from '@/redux/reducers/mainReducer';
import { getCategories } from '@/endpoints';
import { RootState } from '@/redux/store';
import styles from './index.module.scss';
import { useUserSession } from '@/hooks';
import { ProfileDetailPopup, Title } from '@/components';
import { signOut } from 'next-auth/react';

function CustomNavBar(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserProfileHovering, setIsUserProfileHovering] = useState<boolean>(false);
  const [hasMobileMenuOpenedOnce, setHasMobileMenuOpenedOnce] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { session, status } = useUserSession();

  const { isDark, queryString }: { isDark: boolean; queryString: URLSearchParams } = useSelector(
    (state: RootState) => state.mainReducer,
  );

  const { data } = useQuery(['getCategories'], getCategories, {
    refetchOnWindowFocus: false,
  });

  const toggleThemeHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    dispatch(toggleTheme());
  };

  const onCategoryChangeHandler = (categoryId: string) => {
    const newSearchParams = new URLSearchParams(queryString);
    if (categoryId === '') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', categoryId);
    }
    dispatch(setQueryString(newSearchParams));
    dispatch(setIsQueryStringChanged(true));
    router.push('/?' + newSearchParams.toString());
  };

  const toggleMobileMenu = () => {
    setHasMobileMenuOpenedOnce(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle(styles.noScroll);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.classList.toggle(styles.noScroll);
      window.scrollTo(0, 0);
    }
  }, [params]);

  const MenuContents = () => (
    <>
      <div className={styles.menuContents}>
        <NavDropdown
          title="Categories"
          id="offcanvasNavbarDropdown-expand-md"
          className={classNames(styles.dropdownMenu, { [styles.dark]: isDark })}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={() => setShow(!show)}
          show={show}
        >
          <NavDropdown.Item
            className={classNames(styles.dropdownItem, { [styles.dark]: isDark })}
            key="all"
            onClick={() => onCategoryChangeHandler('')}
          >
            All Categories
          </NavDropdown.Item>
          {data &&
            data.map((category: { _id: string; name: string }) => (
              <NavDropdown.Item
                key={category._id}
                className={styles.dropdownItem}
                onClick={() => onCategoryChangeHandler(category.name)}
              >
                {category.name}
              </NavDropdown.Item>
            ))}
        </NavDropdown>
      </div>
      <div className={styles.userSettings}>
        <div className={styles.options}>
          {status === 'authenticated' && session ? (
            <div className={styles.profileContainer}>
              <Title tagType="h3" style={classNames(styles.mobileMenuTitle, isDark && styles.dark)}>
                Account
              </Title>
              <Link href="/profile" className={styles.profileIcon} onMouseEnter={() => setIsUserProfileHovering(true)}>
                <Image
                  src={`/icons/userProfile.svg`}
                  width={25}
                  height={25}
                  className={styles.navThemeIcon}
                  alt="user-profile-btn"
                />
              </Link>
              <div
                className={classNames(
                  styles.profileDetailPopupContainer,
                  isUserProfileHovering && styles.isPopupVisible,
                )}
                onMouseLeave={() => setIsUserProfileHovering(false)}
              >
                <ProfileDetailPopup name={session.user.name} email={session.user.email} />
              </div>
              <Link className={classNames(styles.mobileMenuItem, isDark && styles.dark)} href="/profile">
                Profile
              </Link>
              <Link
                href=""
                className={classNames(styles.mobileMenuItem, isDark && styles.dark)}
                onClick={() => signOut()}
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div className={classNames(styles.unauthenticated, isDark && styles.dark)}>
              <Link className={styles.register} href="/auth/signup">
                Register
              </Link>
              <span className={styles.separator}>/</span>
              <Link className={styles.login} href="/auth/signin">
                Login
              </Link>
            </div>
          )}
        </div>
        <Image
          src={`/icons/theme${isDark ? '-dark' : ''}.svg`}
          width={25}
          height={25}
          className={styles.themeIcon}
          alt="theme-toggle-btn"
          onClick={toggleThemeHandler}
        />
      </div>
    </>
  );

  return (
    <div className={styles.navigationContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.mobileMenuButton} onClick={() => toggleMobileMenu()}>
          <Image src="/icons/burger.svg" width={35} height={35} className={styles.navBarToggle} alt="open-toggle-btn" />
        </div>
        <Link href="/">
          <Image src="/images/TheDailyTide-light.png" alt="logo" width={60} height={60} priority />
        </Link>

        <div className={styles.menu}>
          <MenuContents />
        </div>

        <div
          className={classNames(
            styles.mobileMenu,
            { [styles.hidden]: !isMobileMenuOpen && hasMobileMenuOpenedOnce },
            { [styles.show]: isMobileMenuOpen && hasMobileMenuOpenedOnce },
            { [styles.dark]: isDark },
          )}
        >
          <div className={styles.closeMenuButton}>
            <Image
              src={`/icons/close${isDark ? '-light' : ''}.svg`}
              width={15}
              height={15}
              className={classNames({ [styles.dark]: isDark })}
              alt="close-toggle-btn"
              onClick={() => toggleMobileMenu()}
            />
          </div>
          <div className={styles.mobileMenuContents}>
            <Link href="/">
              <Image
                src={`/images/TheDailyTide${isDark ? '-light' : ''}.png`}
                alt="logo"
                width={60}
                height={60}
                priority
              />
            </Link>
            <MenuContents />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CustomNavBar);
