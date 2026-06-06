import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header';
import Button from '../components/button';
import { useOrder } from '../context/order-context';
import {
  getBaseLabel,
  getCocktailByColor,
  getSparklingLabel,
} from '../utils/cocktail';

const MAX_RATING = 5;

const DetailItem = ({ label, value, rating }) => (
  <DetailCell>
    <DetailLabel>{label}</DetailLabel>
    {value != null ? (
      <DetailValue>{value}</DetailValue>
    ) : (
      <RatingDots>
        {Array.from({ length: MAX_RATING }, (_, i) => (
          <Dot key={i} $filled={i < rating} />
        ))}
      </RatingDots>
    )}
  </DetailCell>
);

const Step3Result = () => {
  const navigate = useNavigate();
  const { order } = useOrder();
  const [extraRequest, setExtraRequest] = useState('');

  const cocktail = useMemo(
    () => getCocktailByColor(order.selectedColorIds, order.customColors),
    [order.selectedColorIds, order.customColors]
  );

  const cocktailDetails = useMemo(
    () => ({
      base: getBaseLabel(order.selectedBase),
      abv: `${order.abv}%`,
      sparkling: getSparklingLabel(order.sparkling),
      sweetness: order.sweetness,
      sourness: order.sourness,
      bitterness: order.bitterness,
    }),
    [order]
  );

  return (
    <Wrapper>
      <Header step={3} />
      <Main>
        <ResultSection>
          <ImageWrapper>
            <CocktailImage src={cocktail.image} alt={cocktail.name} />
          </ImageWrapper>
          <InfoBlock>
            <RowContainer>
              <Divider />
              <CocktailName>{cocktail.name}</CocktailName>
              <Divider />
            </RowContainer>
            <DetailsGrid>
              <DetailRow>
                <DetailItem label="베이스" value={cocktailDetails.base} />
                <DetailItem label="도수" value={cocktailDetails.abv} />
                <DetailItem label="탄산" value={cocktailDetails.sparkling} />
              </DetailRow>
              <DetailRow>
                <DetailItem label="단맛" rating={cocktailDetails.sweetness} />
                <DetailItem label="신맛" rating={cocktailDetails.sourness} />
                <DetailItem label="쓴맛" rating={cocktailDetails.bitterness} />
              </DetailRow>
            </DetailsGrid>
            <FullDivider />
          </InfoBlock>
        </ResultSection>

        <RequestSection>
          <Title>추가 요청</Title>
          <RequestInput
            value={extraRequest}
            onChange={(e) => setExtraRequest(e.target.value)}
            placeholder="예) 달달한 과일향, 민트는 빼고, 카페인/우유는 제외 등"
          />
        </RequestSection>
      </Main>

      <Footer>
        <Button onClick={() => navigate('/success')}>완료</Button>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--black);
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 50%,
      rgba(255, 255, 255, 0.00) 100%
    );
  }
`;

const CocktailImage = styled.img`
  width: min(180px, 48vw);
  height: auto;
  z-index: 100;
`;

const InfoBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-top: 50px;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
`;

const CocktailName = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
`;

const Divider = styled.div`
  flex: 1;
  border-bottom: 1px solid #A0A0A0;
`;

const FullDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid #A0A0A0;
`;

const DetailsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const DetailCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--white);
`;

const DetailValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--mint);
`;

const RatingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: ${({ $filled }) => ($filled ? 'var(--mint)' : 'transparent')};
  border: 1px solid var(--mint);
`;

const RequestSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.label`
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: var(--white);
`;

const RequestInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  resize: none;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px dashed #A0A0A0;
  background-color: var(--black);
  color: var(--white);
  font-size: 14px;
  font-weight: 400;

  &::placeholder {
    color: #A0A0A0;
  }

  &:focus {
    outline: none;
    border-color: var(--white);
  }
`;

const Footer = styled.div`
  padding: 12px 20px calc(20px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;

  @media (min-width: 500px) {
    padding: 12px 20px 40px;
  }
`;

export default Step3Result;
