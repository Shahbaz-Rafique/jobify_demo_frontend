import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
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
  height: '100%',
  padding: theme.spacing(6),
  backgroundColor: '#051220',
}));

export default function SignUp() {
  const [mode, setMode] = React.useState('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

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
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <Stack sx={{ justifyContent: 'center', height: '100%' }}>
          <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                  InputProps={{ sx: { borderRadius: '8px' } }}
                />
              </FormControl>
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
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept all terms & conditions"
                sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  background: 'white',
                  '&:hover': { background: 'white' },
                }}
              >
                Sign up
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
                Sign up with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />} // Add Facebook icon
                onClick={() => alert('Sign up with Facebook')}
                sx={{ py: 1.5, borderRadius: '8px', borderColor: '#47536b', color: 'white', '&:hover': { borderColor: '#47536b' } }}
              >
                Sign up with Facebook
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
