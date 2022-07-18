import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {
  Outlet
} from "react-router-dom";
import styled from '@emotion/styled';

const AppContainer = styled.div`
  text-align: center;
`;

const OutletContainer = styled.div`
  padding: 72px 32px;
`;

const SiteLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function App() {
  return (
    <AppContainer>
      <AppBar>
        <Toolbar>
          <SiteLogo>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              bubble
            </Typography>
            <BubbleChartIcon />
          </SiteLogo>
        </Toolbar>
      </AppBar>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </AppContainer>
  );
}

export default App;
