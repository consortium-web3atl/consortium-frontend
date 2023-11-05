import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BodyApp from "./components/BodyApp";
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)
 
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient,
  webSocketPublicClient,
})

export default function App() {
  return (
    <WagmiConfig config={config}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<BodyApp />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </WagmiConfig>
  );
}
