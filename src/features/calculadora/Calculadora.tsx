import { useState, useEffect } from 'react';
import axios from 'axios';
import { MainLayout } from '../../layout';
import Select from 'react-select';

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

  const fiatOptions= [
    {label: "EUR", value: "EUR"},
    {label: "USD", value: "USD"},
  ];

  const cryptoOptions = [
    { label: "BTC", value: "BTC" },
    { label: "BNB", value: "BNB" },
    { label: "ETH", value: "ETH" },
    { label: "MATIC", value: "MATIC" },
    { label: "AVAX", value: "AVAX" },
    { label: "NEAR", value: "NEAR" },
    { label: "ROSE", value: "ROSE" },
    { label: "IOTA", value: "IOTA" },
    { label: "DOGE", value: "DOGE" },
    { label: "SHIB", value: "SHIB" },
    { label: "SOL", value: "SOL" },
    { label: "ADA", value: "ADA" },
    { label: "LUNA", value: "LUNA" },
    { label: "XRP", value: "XRP" },
    { label: "DOT", value: "DOT" },
    { label: "USDT", value: "USDT" },
    { label: "DAI", value: "DAI" },
    { label: "BUSD", value: "BUSD" },
    { label: "USDC", value: "USDC" },
  ];



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
        <div className="w-2/6 sm:w-1/4 px-2">

  <Select
    options={fiatOptions}
    defaultValue={fiatOptions.find((opt) => opt.value === fiat)}
    onChange={(selected) => setFiat(selected?.value || "EUR")}
    className="text-[#804617] text-xs"
    styles={{
      control: (base) => ({
        ...base,
        borderColor: "#804617",
        borderRadius: "0.5rem",
        padding: "0.25rem",
        minHeight: "2.5rem",
        fontSize: "1rem", // text-xs
        color: "#804617",
        height:47
      }),
      option: (base, state) => ({
        ...base,
        fontSize: "1rem",
        backgroundColor: state.isFocused ? "#f3f4f6" : "white",
        color: "#804617",
        cursor: "pointer",
      }),
    }}
  />
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
        <div className="w-2/6 sm:w-1/4 px-2">

    <Select
    options={cryptoOptions}
    defaultValue={cryptoOptions.find((opt) => opt.value === crypto)}
    onChange={(selected) => setCrypto(selected?.value || "BTC")}
    className="text-[#804617] text-xs"
    styles={{
      control: (base) => ({
        ...base,
        borderColor: "#804617",
        borderRadius: "0.5rem",
        padding: "2px",
        minHeight: "2.5rem",
        fontSize: "1rem", // text-xs
        height:47
      }),
      option: (base, state) => ({
        ...base,
        fontSize: "1rem", // text-xs
        color: "#804617",
        backgroundColor: state.isFocused ? "#f5f5f5" : "white",
        cursor: "pointer",
      }),
      menu: (base) => ({
        ...base,
        zIndex: 50,
      }),
    }}
  />
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

      <div className="flex flex-wrap pt-19 justify-center mt-5 crypto-logos">
        {[
          'btc', 'bnb', 'matic', 'eth', 'iota', 'usdt', 'dai', 'busd'
        ].map((name) => (
          <div key={name} className="w-1/5 sm:w-1/15 p-2">
            <img
              className="logo-crypto"
              src={`/assets/img/${name}-logo.png`}
              alt={`${name.toUpperCase()} Logo`}
            />
          </div>
        ))}
      </div>
    </MainLayout>
  );
};
