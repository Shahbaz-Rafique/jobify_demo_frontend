import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(5),
  gap: theme.spacing(3),
  margin: 'auto',
  borderRadius: '12px',
  boxShadow:
    '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.15)',
  [theme.breakpoints.up('sm')]: {
    width: '550px',
  },
  backgroundColor: theme.palette.mode === 'dark' ? '#050e18' : '#fff',
  textAlign: 'left', 
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  padding: theme.spacing(6),
  backgroundColor: '#051220',
}));

export default function SignIn() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
  
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/authentication/signin`, 
        userData, 
        {
          headers: {
            'api-key': process.env.REACT_APP_API_KEY, 
            'Content-Type': 'application/json' 
          }
        }
      );
      
      const { token, email, role } = response.data;

      Cookies.set('token', token, { expires: 1/24 }); 
      Cookies.set('email', email, { expires: 1/24 });
      Cookies.set('role', role, { expires: 1/24 });

      if(role=="admin"){
        history.push('/dashboard');
      }
      else if(role=="superadmin"){
        history.push('/superdashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error.response?.data || error.message);
    }
  };  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <Stack sx={{ justifyContent: 'center', height: '100%' }}>
          <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  InputProps={{ sx: { borderRadius: '8px' } }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  InputProps={{ sx: { borderRadius: '8px' } }}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  background: '#c2c9d6',
                  '&:hover': { background: 'white' },
                }}
              >
                Sign In
              </Button>
              <Typography sx={{ textAlign: 'center', mt: 1, color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link href="/sign-in" variant="body2" sx={{ fontWeight: 600 }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
            <Divider>
              <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => alert('Sign up with Google')}
                sx={{ py: 1.5, borderRadius: '8px', borderColor: '#47536b', color: 'white', '&:hover': { borderColor: '#47536b' } }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => alert('Sign up with Facebook')}
                sx={{ py: 1.5, borderRadius: '8px', borderColor: '#47536b', color: 'white', '&:hover': { borderColor: '#47536b' } }}
              >
                Sign in with Facebook
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
