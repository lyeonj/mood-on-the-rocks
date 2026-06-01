import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LogoImg from '../assets/images/product/logo.png';
import productPackageImg from '../assets/images/product/product-package.png';
import martiniGlassImg from '../assets/images/product/martini-glass-on-the-rocks.png';
import iceCherryImg from '../assets/images/product/ice-cherry.png';
import swizzleStickImg from '../assets/images/product/swizzle-stick.png';
import plusIcon from '../assets/images/product/plus.svg';

const FULL_PRODUCTS = [
    {
        id: 1,
        name: 'Product Package',
        price: '₩49,900',
        img: productPackageImg,
    },
    {
        id: 2,
        name: 'Martini Glass On The Rocks',
        price: '₩25,900',
        img: martiniGlassImg,
    },
];

const HALF_PRODUCTS = [
    {
        id: 3,
        name: 'Ice Cherry',
        price: '₩10,900',
        img: iceCherryImg,
    },
    {
        id: 4,
        name: 'Swizzle Stick',
        price: '₩14,900',
        img: swizzleStickImg,
    },
];

const Product = () => {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastKey, setToastKey] = useState(0);

    const showToast = () => {
        setToastVisible(true);
        setToastKey((k) => k + 1);
    };

    return (
        <Wrapper>
            <Page>
                <Header>
                    <Logo src={LogoImg} />
                </Header>

                <ProductList>
                    {FULL_PRODUCTS.map((product) => (
                        <FullCard key={product.id}>
                            <ImageBox $tall>
                                <img src={product.img} alt={product.name} />
                            </ImageBox>
                            <Meta>
                                <NameTag>{product.name}</NameTag>
                                <PriceTag>{product.price}</PriceTag>
                                <Spacer />
                                <AddButton type="button" onClick={showToast} aria-label={`${product.name} 장바구니에 추가`}>
                                    <img src={plusIcon} alt="" />
                                </AddButton>
                            </Meta>
                        </FullCard>
                    ))}

                    <HalfGrid>
                        {HALF_PRODUCTS.map((product) => (
                            <HalfCard key={product.id}>
                                <ImageBox>
                                    <img src={product.img} alt={product.name} />
                                </ImageBox>
                                <Meta>
                                    <NameTag $compact>{product.name}</NameTag>
                                    <Spacer />
                                    <AddButton type="button" onClick={showToast} aria-label={`${product.name} 장바구니에 추가`}>
                                        <img src={plusIcon} alt="" />
                                    </AddButton>
                                </Meta>
                                <PriceTag $compact>{product.price}</PriceTag>
                            </HalfCard>
                        ))}
                    </HalfGrid>
                </ProductList>
            </Page>

            {toastVisible && (
                <Toast key={toastKey} onAnimationEnd={() => setToastVisible(false)}>
                장바구니에 추가되었습니다
                </Toast>
            )}
        </Wrapper>
    );
};

export default Product;

const Wrapper = styled.main`
    min-height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--white);
    color: var(--black);
    overflow: hidden;
`;

const Page = styled.div`
    width: 100%;
    max-width: 460px;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const Logo = styled.img`
    width: 200px;
    height: auto;
    display: block;
`;

const ProductList = styled.section`
    flex: 1;
    padding: 0 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const FullCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const HalfGrid = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const HalfCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ImageBox = styled.div`
    border: 1px solid var(--black);
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: ${({ $tall }) => ($tall ? '2 / 1' : '1 / 1')};

    img {
        width: ${({ $tall }) => ($tall ? '80%' : '100%')};
        height: auto;
        object-fit: contain;
    }
`;

const Meta = styled.div`
    display: flex;
    align-items: stretch;
    gap: 8px;
`;

const NameTag = styled.span`
    display: inline-flex;
    align-items: center;
    background: #A0F4F4;
    color: var(--black);
    border: 1px solid var(--black);
    font-size: 14px;
    font-weight: 500;
    padding: 4px 8px;
    white-space: nowrap;
`;

const PriceTag = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--black);
    background: var(--white);
    color: #202020;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    white-space: nowrap;
    align-self: ${({ $compact }) => ($compact ? 'flex-start' : 'stretch')};
`;

const Spacer = styled.div`
    flex: 1;
`;

const AddButton = styled.button`
    flex-shrink: 0;

    border: 1px solid var(--black);
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 5px;

    img {
        width: 15px;
        height: 15px;
        display: block;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const pop = keyframes`
    0%   { opacity: 0; transform: translateX(-50%) translateY(10px); }
    12%  { opacity: 1; transform: translateX(-50%) translateY(0); }
    82%  { opacity: 1; }
    100% { opacity: 0; }
`;

const Toast = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.80);
    color: var(--white);
    font-size: 12px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 100;
    animation: ${pop} 2s ease forwards;
`;
