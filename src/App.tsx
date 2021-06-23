import React, { useEffect, useState } from 'react'
import {  Page, Section, Button, Header } from 'decentraland-ui'

import './App.css'

const NETWORK_DATA: {[key: string]: { mana: string, network: string}} = {
  '0x1' : { mana: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942', network: 'Ethereum mainnet'},
  '0x3': { mana: '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb', network: 'Ropsten'},
  '0x4': { mana: '0xe7fDae84ACaba2A5Ba817B6E6D8A2d415DBFEdbe', network: 'Rinkeby'},
  '0x5': { mana: '0x230fc362413d9e862326c2c7084610a5a2fdf78a', network: 'Goerli'},
  '0x2a': { mana: '0x28bce5263f5d7f4eb7e8c6d5d78275ca455bac63', network: 'Kovan'},
  '0x137': { mana: '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4', network: 'Polygon'},
  '0x8001': { mana: '0x882Da5967c435eA5cC6b09150d55E8304B838f45', network: 'Mumbai'}
}

function App() {
  const [added, setAdded] = useState(false)
  const [network, setNetwork] = useState('Not connected')

  useEffect(() => {
    const provider = (window as any).ethereum
    provider.request({ method: 'eth_requestAccounts'}).then(() => {
      const network = NETWORK_DATA[provider.chainId] ? NETWORK_DATA[provider.chainId].network : 'unknown'
      setNetwork(network)
    })

    provider.on('chainChanged', () => {
      const network = NETWORK_DATA[provider.chainId] ? NETWORK_DATA[provider.chainId].network : 'unknown'
      setNetwork(network)
    })
  })


  const addToken = async () => {
    const provider = (window as any).ethereum

    try {
    const res = await provider.request({
        method: 'metamask_watchAsset',
        params: {
          "type":"ERC20",
          "options":{
            "address": NETWORK_DATA[provider.chainId].mana,
            "symbol": 'MANA',
            "decimals": 18,
            "image": 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSI4NS4zNTUlIiB5MT0iMTQuNjQ1JSIgeDI9IjE0LjY0NSUiIHkyPSI4NS4zNTUlIiBpZD0iYSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGMkQ1NSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiNGRkJDNUIiIG9mZnNldD0iMTAwJSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSI0OS45NjYlIiB5MT0iMCUiIHgyPSI0OS45NjYlIiB5Mj0iMTAwJSIgaWQ9ImIiPjxzdG9wIHN0b3AtY29sb3I9IiNBNTI0QjMiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkYyRDU1IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iNDkuOTY2JSIgeTE9IjAlIiB4Mj0iNDkuOTY2JSIgeTI9IjEwMCUiIGlkPSJjIj48c3RvcCBzdG9wLWNvbG9yPSIjQTUyNEIzIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGMkQ1NSIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9InVybCgjYSkiIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIvPjxwYXRoIGZpbGw9InVybCgjYikiIGQ9Ik0xMS4zMTMgMHYxMy41aDExLjI1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS40NCAxMS43KSIvPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0xLjUwMyAyNS4yaDExLjI1VjExLjd6Ii8+PHBhdGggZD0iTTcuMiAzMi40QTE3LjkyNSAxNy45MjUgMCAwMDE4IDM2YzQuMDUgMCA3Ljc5NC0xLjM0MSAxMC44LTMuNkg3LjJ6IiBmaWxsPSIjRkYyRDU1Ii8+PHBhdGggZD0iTTMuNiAyOC44YTE4LjQzNSAxOC40MzUgMCAwMDMuNiAzLjZoMjEuNmExOC40MzUgMTguNDM1IDAgMDAzLjYtMy42SDMuNnoiIGZpbGw9IiNGQzk5NjUiLz48cGF0aCBkPSJNMjQuMTQ3IDI1LjJIMS41MDNBMTcuOTIzIDE3LjkyMyAwIDAwMy42IDI4LjhoMjAuNTU2di0zLjZoLS4wMDl6IiBmaWxsPSIjRkZCQzVCIi8+PHBhdGggZmlsbD0idXJsKCNjKSIgZD0iTTguMzA3IDB2OS45aDguMjUzeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuODQgMTguOSkiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTUuOTAzIDI4LjhoOC4yNDR2LTkuOXoiLz48Y2lyY2xlIGZpbGw9IiNGRkM5NUIiIGN4PSIyNC4xNDciIGN5PSIxMS43IiByPSI0LjUiLz48Y2lyY2xlIGZpbGw9IiNGRkM5NUIiIGN4PSIxMi43NTMiIGN5PSI2Ljc1IiByPSIyLjI1Ii8+PC9nPjwvc3ZnPg=='
          },
        },
        id: Math.round(Math.random() * 100000),
      })
      if (res) {
        setAdded(true)
      }
    } catch(e) {
      console.log(e.message)
    }
  }



  return (
    <Page>
      <Section>
        <Header>
         <i className="mana-icon" />
          Add MANA to Metamask
        </Header>
        <p className="first-line">Connected network: <b>{network}</b></p>
        <p className="second-line">If you want to add MANA to another network, switch it on Metamask</p>
        <Button onClick={addToken} primary>
          Add MANA Token
        </Button>
        { added ? <p className="success">MANA added succesfully</p> : null }
      </Section>
    </Page>
  );
}

export default App
