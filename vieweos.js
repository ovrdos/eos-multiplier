const { sign } = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');

// === CONFIG ===
const key_name = 'organizations/5ca82049-d784-4027-bac6-cf76d2c17803/apiKeys/8b47d3ab-ea45-4521-9c3e-409dd4ad300d';
const key_secret = '-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIH2q18jT21PfMRpno5oHoutm+XQIT5M0cs88F4JWv9AUoAoGCCqGSM49\nAwEHoUQDQgAEFwZLvqsSQrgj9+BD21WSKKBOmBC+S4JqbRhpZKgJIHNawE6+NfrT\nEqumP4jmiSY3YJ9wv03LcTe2oDXXOs2mew==\n-----END EC PRIVATE KEY-----\n';

const api_url = 'https://api.coinbase.com';

// === HELPERS ===
function createJWT(method, path) {
  const algorithm = 'ES256';
  const uri = `${method} api.coinbase.com${path}`;
  const now = Math.floor(Date.now() / 1000);
  return sign(
    {
      iss: 'cdp',
      nbf: now,
      exp: now + 120,
      sub: key_name,
      uri,
    },
    key_secret,
    {
      algorithm,
      header: {
        kid: key_name,
        nonce: crypto.randomBytes(16).toString('hex'),
      },
    }
  );
}

async function callCoinbase(method, path, body = null) {
  const token = createJWT(method, path);
  try {
    const res = await axios({
      method,
      url: `${api_url}${path}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: body,
    });
    return res.data;
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    return null;
  }
}

// === MAIN ===
(async () => {
  // 1. List accounts
  const accounts = await callCoinbase('GET', '/v2/accounts');
  if (!accounts) return;
  //console.log('Accounts:', accounts);

  // 2. Find EOS account ID
  const eosAccount = accounts.data.find(acc => acc.name === 'EOS Wallet');
  if (!eosAccount) {
    console.error('account not found.');
    return;
  }

  console.log('Account id:' , eosAccount.id)
  // 3. Send EOS with memo
  const getRes = await callCoinbase('GET', `/v2/accounts/${eosAccount.id}/transactions`, {
  });
  
  if (getRes) {
    console.log('success:', getRes);
  }
  
})();

