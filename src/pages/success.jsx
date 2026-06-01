import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoText from '../assets/images/logo-text.png';
import logoIcon from '../assets/images/logo-icon.png';

const Success = () => {
  const navigate = useNavigate();

  const orderNumber = 1;
  const estimatedTime = '10-15분';

  return (
    <Wrapper>
      <Content>
        <LogoText src={logoText} />
        <LogoIcon src={logoIcon} />
        <Message>주문이 완료되었어요</Message>

        <OrderCard>
          <Label>주문 번호</Label>
          <OrderNumber>#{orderNumber}</OrderNumber>
          <Divider />
          <EstimateText>예상 준비 시간 : {estimatedTime}</EstimateText>
        </OrderCard>

        <ProductButton onClick={() => navigate('/product')}>
          브랜드 굿즈 둘러보기
        </ProductButton>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  background: var(--black);
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 24px;
`;

const LogoText = styled.img`
  width: min(160px, 50vw);
  height: auto;
  padding-bottom: 20px;
`;

const LogoIcon = styled.img`
  width: min(220px, 60vw);
  height: auto;
`;

const Message = styled.span`
  color: var(--white);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  cursor: default;
`;

const OrderCard = styled.div`
  width: 100%;
  max-width: 320px;
  border-radius: 12px;
  border: 1px solid #A0A0A0;
  background: var(--black);
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
`;

const Label = styled.span`
  color: #A0A0A0;
  font-size: 14px;
  font-weight: 500;
`;

const OrderNumber = styled.span`
  color: var(--mint);
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
`;

const Divider = styled.div`
  width: 100%;
  max-width: 160px;
  margin: 12px 0;
  border-bottom: 1px solid #707070;
`;

const EstimateText = styled.span`
  color: #A0A0A0;
  font-size: 12px;
  font-weight: 400;
`;

const ProductButton = styled.button`
  width: 100%;
  max-width: 320px;
  padding: 12px;
  border-radius: 12px;
  color: #171717;
  background: #72EBEA;
  border: none;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.3s ease;
  margin-top: -12px;

  &:hover {
    filter: brightness(0.85);
  }
`;

export default Success;
