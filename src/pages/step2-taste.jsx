import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header';
import Option from '../components/option';
import Slider from '../components/slider';
import Button from '../components/button';
import { useOrder } from '../context/order-context';
import { resolveRecommendations } from '../utils/cocktail';
import infoIcon from '../assets/images/info-icon.svg';

const BASE_INFO = [
  { ko: '진', en: 'Gin', description: '허브와 솔향이 느껴지는 상쾌하고 향이 독특한 술' },
  { ko: '보드카', en: 'Vodka', description: '맛과 향이 거의 없어 깔끔하고 믹스하기 좋은 술' },
  { ko: '럼', en: 'Rum', description: '사탕수수로 만들어 달콤하고 부드러운 술' },
  { ko: '데킬라', en: 'Tequila', description: '묵직하면서도 톡 쏘는 개성이 있는 멕시코 술' },
  { ko: '위스키', en: 'Whiskey', description: '나무 숙성 향이 더해져 깊고 진한 풍미가 나는 술' },
];

const BASE_OPTIONS = [
  { id: 'gin', label: '진' },
  { id: 'vodka', label: '보드카' },
  { id: 'rum', label: '럼' },
  { id: 'tequila', label: '데킬라' },
  { id: 'whisky', label: '위스키' },
  { id: 'recommend', label: '추천' },
];

const Step2Taste = () => {
  const navigate = useNavigate();
  const { updateOrder } = useOrder();
  const [selectedBase, setSelectedBase] = useState('recommend');
  const [abv, setAbv] = useState(10);
  const [sweetness, setSweetness] = useState(3);
  const [sourness, setSourness] = useState(3);
  const [bitterness, setBitterness] = useState(3);
  const [sparkling, setSparkling] = useState(null);
  const [baseInfoOpen, setBaseInfoOpen] = useState(false);

  const sliders = useMemo(
    () => [
      {
        id: 'abv',
        label: '도수(ABV)',
        value: abv,
        min: 0,
        max: 40,
        step: 5,
        text: `${abv}%`,
        onChange: (e) => setAbv(Number(e.target.value)),
      },
      {
        id: 'sweetness',
        label: '단맛',
        value: sweetness,
        min: 1,
        max: 5,
        step: 1,
        text: `${sweetness}`,
        onChange: (e) => setSweetness(Number(e.target.value)),
      },
      {
        id: 'sourness',
        label: '신맛',
        value: sourness,
        min: 1,
        max: 5,
        step: 1,
        text: `${sourness}`,
        onChange: (e) => setSourness(Number(e.target.value)),
      },
      {
        id: 'bitterness',
        label: '쓴맛',
        value: bitterness,
        min: 1,
        max: 5,
        step: 1,
        text: `${bitterness}`,
        onChange: (e) => setBitterness(Number(e.target.value)),
      },
    ],
    [abv, sweetness, sourness, bitterness]
  );

  return (
    <Wrapper>
      <Header step={2} />
      <Main>
        <Section>
          <TitleRow>
            <Title>베이스</Title>
            <InfoButton
              type="button"
              aria-label="베이스 설명"
              onClick={() => setBaseInfoOpen(true)}
            >
              <img src={infoIcon} width={15} height={15} />
            </InfoButton>
          </TitleRow>
          <OptionRow>
            {BASE_OPTIONS.map((base) => (
              <Option
                key={base.id}
                label={base.label}
                selected={selectedBase === base.id}
                onClick={() => setSelectedBase(base.id)}
              />
            ))}
          </OptionRow>
        </Section>

        {sliders.map((slider) => (
          <Section key={slider.id}>
            <Slider
              label={slider.label}
              value={slider.value}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              valueText={slider.text}
              onChange={slider.onChange}
            />
          </Section>
        ))}

        <Section>
          <Title>탄산</Title>
          <OptionRow>
            <SparklingButton
              $selected={sparkling === true}
              onClick={() => setSparkling(true)}
            >
              ON
            </SparklingButton>
            <SparklingButton
              $selected={sparkling === false}
              onClick={() => setSparkling(false)}
            >
              OFF
            </SparklingButton>
            <SparklingButton
              $selected={sparkling === null}
              onClick={() => setSparkling(null)}
            >
              추천
            </SparklingButton>
          </OptionRow>
        </Section>
      </Main>

      <Footer>
        <Button
          onClick={() => {
            updateOrder({
              ...resolveRecommendations(selectedBase, sparkling),
              abv,
              sweetness,
              sourness,
              bitterness,
            });
            navigate('/loading');
          }}
        >
          다음
        </Button>
      </Footer>

      {baseInfoOpen && (
        <ModalBackdrop role="presentation" onClick={() => setBaseInfoOpen(false)}>
          <BaseInfoPanel
            aria-label="베이스 설명"
            onClick={(e) => e.stopPropagation()}
          >
            <BaseInfoList>
              {BASE_INFO.map((item) => (
                <BaseInfoItem>
                  <BaseInfoName>
                    {item.ko}<BaseInfoNameEn>{item.en}</BaseInfoNameEn>
                  </BaseInfoName>
                  <BaseInfoDescription>{item.description}</BaseInfoDescription>
                </BaseInfoItem>
              ))}
            </BaseInfoList>
          </BaseInfoPanel>
        </ModalBackdrop>
      )}
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
  gap: 32px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.label`
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: var(--white);
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
`;

const BaseInfoPanel = styled.div`
  width: 100%;
  max-width: 308px;
  padding: 28px 20px;
  border-radius: 12px;
  background-color: var(--black);
  border: 1px solid var(--mint);
  box-shadow: 4px 4px 20px 0 rgba(114, 235, 234, 0.20);
  box-sizing: border-box;
`;

const BaseInfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BaseInfoItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BaseInfoName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--mint);
  cursor: default;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BaseInfoNameEn = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: var(--mint);
  cursor: default;
`;

const BaseInfoDescription = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: var(--white);
  cursor: default;
`;

const OptionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SparklingButton = styled.button`
  min-width: 54px;
  padding: 8px 0;
  border: 1px solid var(--mint);
  border-radius: 100px;
  background-color: ${({ $selected }) => ($selected ? 'var(--mint)' : 'var(--black)')};
  color: ${({ $selected }) => ($selected ? 'var(--black)' : 'var(--mint)')};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 8px rgba(87, 255, 246, 0.2);
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Footer = styled.div`
  padding: 12px 20px calc(20px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;

  @media (min-width: 500px) {
    padding: 12px 20px 40px;
  }
`;

export default Step2Taste;
