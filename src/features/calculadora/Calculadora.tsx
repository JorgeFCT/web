import { useState, useEffect } from 'react';
import axios from 'axios';
import { MainLayout } from '../../layout';

const symbolToId: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  BNB: 'binancecoin',
  MATIC: 'polygon',
  AVAX: 'avalanche-2',
  NEAR: 'near',
  ROSE: 'oasis-network',
  IOTA: 'iota',
  DOGE: 'dogecoin',
  SHIB: 'shiba-inu',
  SOL: 'solana',
  ADA: 'cardano',
  LUNA: 'terra-luna',
  XRP: 'ripple',
  DOT: 'polkadot',
  USDT: 'tether',
  DAI: 'dai',
  BUSD: 'binance-usd',
  USDC: 'usd-coin',
};

export const Calculadora = () => {
  const [fiat, setFiat] = useState('EUR');
  const [fiatAmount, setFiatAmount] = useState('');
  const [crypto, setCrypto] = useState('BTC');
  const [resultCrypto, setResultCrypto] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = Object.values(symbolToId).join(',');
    axios
      .get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids,
          vs_currencies: fiat.toLowerCase(),
        },
      })
      .then((response) => {
        setExchangeRates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [fiat]);

  useEffect(() => {
    const parsedAmount = parseFloat(fiatAmount);
    const coinId = symbolToId[crypto];
    const rate = exchangeRates?.[coinId]?.[fiat.toLowerCase()];
    
    if (!isNaN(parsedAmount) && rate) {
      const result = parsedAmount / rate;
      setResultCrypto(result.toFixed(6));
    } else {
      setResultCrypto('');
    }
  }, [fiatAmount, crypto, fiat, exchangeRates]);

  return (
    <MainLayout>
      <div>
        <div className="flex justify-center mt-5">
          <p className="text-center">
            Precio calculado en tiempo real sobre Binance. Actualiza cada 30 segundos
          </p>
        </div>
      </div>

      <div className="calculadora mt-5">
        <div className="flex justify-center mb-3">
          <div className="w-1/4 sm:w-1/4 px-2">
            <select
              className="w-full rounded-lg p-2 bg-white text-[#804617] cursor-pointer border border-[#804617] focus:outline-none"
              value={fiat}
              onChange={(e) => setFiat(e.target.value)}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="w-[40%] px-2">
            <input
              type="text"
              className="w-full h-12 text-center bg-white border border-[#804617] rounded-lg text-[#804617] focus:outline-none"
              placeholder="Enter amount"
              value={fiatAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setFiatAmount(value);
                }
              }}
              
            />
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <div className="w-1/4 sm:w-1/4 px-2">
            <select
              className="w-full rounded-lg p-2 bg-white text-[#804617] cursor-pointer border border-[#804617] focus:outline-none"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
            >
              <option value="BTC">BTC</option>
              <optgroup label="Alt coins">
                <option value="BNB">BNB</option>
                <option value="ETH">ETH</option>
                <option value="MATIC">MATIC</option>
                <option value="AVAX">AVAX</option>
                <option value="NEAR">NEAR</option>
                <option value="ROSE">ROSE</option>
                <option value="IOTA">IOTA</option>
                <option value="DOGE">DOGE</option>
                <option value="SHIB">SHIB</option>
                <option value="SOL">SOL</option>
                <option value="ADA">ADA</option>
                <option value="LUNA">LUNA</option>
                <option value="XRP">XRP</option>
                <option value="DOT">DOT</option>
              </optgroup>
              <optgroup label="Stable coins">
                <option value="USDT">USDT</option>
                <option value="DAI">DAI</option>
                <option value="BUSD">BUSD</option>
                <option value="USDC">USDC</option>
              </optgroup>
            </select>
          </div>
          <div className="w-[40%] px-2">
            <input
              type="text"
              className="w-full h-12 text-center bg-white border border-[#804617] rounded-lg text-[#804617] focus:outline-none"
              placeholder="Converted amount"
              value={loading ? 'Cargando...' : resultCrypto}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-5 crypto-logos">
        {[
          'btc', 'bnb', 'matic', 'eth', 'iota', 'usdt', 'dai', 'busd'
        ].map((name) => (
          <div key={name} className="w-1/6 sm:w-1/15 p-2">
            <img
              className="logo-crypto"
              src={`src/assets/img/${name}-logo.png`}
              alt={`${name.toUpperCase()} Logo`}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
