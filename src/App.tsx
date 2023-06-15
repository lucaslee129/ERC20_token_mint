import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SpaceCreditAbi from './asset/SpaceCreditAbi.json';
import { Button, Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

declare var window: any;

function App() {
  const [token, setToken] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState();
  const [isActive, setActive] = useState(false);

  const url: string =
    'https://sepolia.infura.io/v3/e14e866418594599bf7faa569a05b75b';
  // Configuration for Web3
  const web3: any = new Web3(new Web3.providers.HttpProvider(url));
  const tokenAddress: string = '0xfF8EF6227F68A16C49FC843d2EdBb6A98B4F8e15';
  const contract: any = new web3.eth.Contract(SpaceCreditAbi, tokenAddress);

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum._state.isUnlocked) {
        setActive(true);
        connectMetaMask();
      } else {
        setActive(false);
      }
    } else {
      window.alert('Please install MetaMask');
      window.open('https://metamask.io/download.html', '_self');
    }
  }, [isActive]);

  async function connectMetaMask(): Promise<void> {
    // if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const _web3 = new Web3(window.ethereum);
    const walletAccount: any = await _web3.eth.getAccounts();
    const balanceWei: any = await _web3.eth.getBalance(walletAccount[0]);
    const balanceEth: any = await _web3.utils.fromWei(balanceWei, 'ether');
    let SpaceCreditTokenWei = await contract.methods
      .balanceOf(walletAccount[0])
      .call();
    let SpaceCreditTokenEth: string = _web3.utils.fromWei(
      SpaceCreditTokenWei,
      'ether'
    );
    console.log(SpaceCreditTokenEth);

    setAccount(walletAccount[0]);
    setBalance(balanceEth);
    setToken(SpaceCreditTokenEth);
    // } else {
    //   window.alert('Please install MetaMask');
    //   window.open('https://metamask.io/download.html', '_self');
    // }
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ backgroundColor: '0 0 0 30' }}
      >
        {/* <Grid item xs={12} justifyContent='center'> */}
        <Paper
          elevation={3}
          sx={{
            height: '80vh',
            width: '40%',
            marginTop: '60px',
            paddingTop: '3%',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Container sx={{ width: '70%' }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                marginTop: '10%',
                marginBottom: '10%',
                fontWeight: 'Bold',
                color: 'GrayText',
              }}
            >
              SpaceCredit
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={isActive}
              sx={{ width: '100%', fontSize: '24px' }}
              onClick={connectMetaMask}
            >
              Connect
            </Button>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'justify',
                marginTop: '5%',
                fontWeight: 'Bold',
              }}
            >
              WalletAddress:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
                marginBottom: '5%',
                fontWeight: 'Bold',
              }}
            >
              {account}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'justify',
                marginTop: '5%',
                fontWeight: 'Bold',
              }}
            >
              Balance:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
                marginBottom: '5%',
                fontWeight: 'Bold',
              }}
            >
              {balance}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'justify',
                marginTop: '5%',
                fontWeight: 'Bold',
              }}
            >
              Total Supply:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
                marginBottom: '5%',
                fontWeight: 'Bold',
              }}
            >
              {token}
            </Typography>
          </Container>
        </Paper>
      </Grid>
    </>
  );
}

export default App;
