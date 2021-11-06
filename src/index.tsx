import ReactDOM from 'react-dom';
import App from './App';
import store from 'store/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from 'core/theme/theme.config';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root'),
);
