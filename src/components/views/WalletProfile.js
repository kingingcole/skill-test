import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineKey } from 'react-icons/ai';

import { SERVER_URL } from '../../constants/env';
import WalletResetPasswordModal from "../component/WalletResetPasswordModal";
    
function WalletProfile() {
  const [t,i18n] = useTranslation();
  const [use,setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showModal,setShowModal] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);

  const serverUrl = SERVER_URL


  useEffect(() => {
    const getEthPrice = async () => {
      axios.post(serverUrl + "wallets/getTokenPrice", {symbol:"ETH"})
        .then(response=>{
          if (response.data.data) {
            setEthPrice(response.data.data)
          }
        })
    }

    getEthPrice()
  }, [serverUrl])

  return (
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
      <Row>
        <Col span={20}>
         {t('Email Address')} 
        </Col>
        <Col span={4} className="text-center text-overflow">
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.email)}
        </Col>
        <Col span={4} className="text-center">
          <a onClick={()=>setShowModal(true)}><AiOutlineKey size={20} className="inline mr-2"/></a>
        </Col>
      </Row>

      <Row className='mt-10'>
        <Col span={20}>
         Ethereum Price
        </Col>
      </Row>
      <Row className="text-lg font-bold">
        <Col span={20}>
          {ethPrice === 0 ? "Loading ..." : `${ethPrice.toFixed(2)} USD`}
        </Col>
      </Row>


      {
        showModal?
          <WalletResetPasswordModal  setModalShow={setShowModal} title="Reset Password"/>
        : null
      }
    </Col>
  );
}

export default WalletProfile;