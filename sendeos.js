require('dotenv').config();
const { sign } = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');

const key_name = process.env.KEY_NAME;
const key_secret = process.env.KEY_SECRET.replace(/\\n/g, '\n');
const destination_tag = process.env.DESTINATION_TAG;
// === CONFIG ===
//
// Auth - https://docs.cdp.coinbase.com/coinbase-app/docs/getting-started#creating-api-keys 
// API - https://docs.cdp.coinbase.com/coinbase-app/docs/api-transactions#send-money
//
// [key_name] - Auth link above
// [key_secret] - Auth link above 
// [destination_tag] - Coinbase App -> EOS Wallet -> Receive -> EOS memo (copy)
// Add to .env file
//

const api_url = 'https://api.coinbase.com';

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
  const sendRes = await callCoinbase('POST', `/v2/accounts/${eosAccount.id}/transactions`, {
    "type": "send",
    //"to": "bc1qvykjaawl8tc7zqgeusykm3l9xvmxr6xhwu00r3",
    "to": "chain.new",
    "amount": "1",
    "currency": "EOS",
    "destination_tag": destination_tag,
    "idem": crypto.randomUUID(),
  });
  
  if (sendRes) {
    console.log('Send success:', sendRes);
  }
  
})();

