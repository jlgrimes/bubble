import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Stack from '@mui/material/Stack';

import {
  Outlet
} from "react-router-dom";
import styled from '@emotion/styled';
import { BetaBanner } from './features/App/BetaBanner';

const AppContainer = styled.div`
`;

const OutletContainer = styled.div`
  padding: 72px 32px;
`;

const SiteLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`;

function App() {
  return (
    <AppContainer>
      <AppBar>
        <Toolbar>
          <SiteLogo>
            <Typography variant="h6">
              Bubble
            </Typography>
            <BubbleChartIcon />
          </SiteLogo>
          <Typography>Made by Jared :)</Typography>
        </Toolbar>
      </AppBar>
      <OutletContainer>
        <Stack spacing={2}>
          <BetaBanner />
          <Outlet />
        </Stack>
      </OutletContainer>
    </AppContainer>
  );
}

export default App;
