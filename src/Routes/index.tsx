import App from './App';
import { HashRouter } from 'react-router-dom';
import { dark as darkTheme } from '../themes/app';
import { Theme, ThemeProvider as MuiThemeProvider } from '@material-ui/core';
import { AppThemeProvider } from 'src/helpers/app-theme-context';
import { PropsWithChildren } from 'react';

const DefaultThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  return <MuiThemeProvider theme={darkTheme}>{children}</MuiThemeProvider>;
};

function Root() {
  let Content = App;
  let defaultTheme: Theme | undefined = darkTheme;
  let ThemeProvider = DefaultThemeProvider;

  defaultTheme = undefined;
  ThemeProvider = AppThemeProvider;

  return (
    <HashRouter>
      <ThemeProvider>
        <Content />
      </ThemeProvider>
    </HashRouter>
  );
}

export default Root;
