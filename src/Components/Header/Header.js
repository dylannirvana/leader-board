import styled from 'styled-components'
import React from 'react'
import Flag from '../../flag.png';
// import {AppContext} from "./AppProvider"
const Pgalogo = 'https://az690879.vo.msecnd.net/7460/PGA.png';


const Logo = styled.img`
  height: 80px;
  padding: 15px;
`

const AppTitle = styled.h1`
  color: white;
  font-family: Arial;
  padding-top: 10px;

`
const Settings = styled.img`
justify-self: end;
padding: 15px;
height: 95px;
`

const AppHeader = styled.div`
  background-color: rgb(19, 53, 90);
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`


export default function () {
  return (
    <AppHeader>
      <Logo src={Pgalogo}/>
      <AppTitle> PGA Leader Board </AppTitle>
      <Settings src={Flag}/>
    </AppHeader>
  )
}