import styled, { css } from 'styled-components';

import MDrawer from "@material-ui/core/Drawer";

import { IoDocumentText } from 'react-icons/io5';
import { FaBook } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { MdLocalLibrary } from 'react-icons/md';

const iconCSS = css`
  width: 30px;
  height: 30px;
  fill: #8c8c8c;
  flex-shrink: 0;
`;

export const Drawer = styled(MDrawer)`
  span {
    color: #8c8c8c;
  }

  a:hover {
    span {
      color: #737373;
    }

    svg {
      fill: #737373;
    }
  }

  .toolbar {
    padding: 10px 5px;
    background-color: #3f51b5;
    height: 5rem;
    display: flex;
  }
`;

export const Image = styled.img`
  height: 100%;
`;

export const Loan = styled(IoDocumentText)`${iconCSS}`;

export const Book = styled(FaBook)`${iconCSS}`;

export const Student = styled(HiAcademicCap)`${iconCSS}`;

export const User = styled(MdLocalLibrary)`${iconCSS}`;

export const Main = styled.main`
  background-color: #f2f2f2;
  height: 100vh;

  .toolbar {
    padding: 10px 5px;
    height: 5rem;
    display: flex;
  }
`;