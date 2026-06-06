import { createContext, useContext, useMemo, useState } from 'react';

const OrderContext = createContext(null);

const DEFAULT_ORDER = {
  selectedColorIds: [],
  customColors: [],
  selectedMoods: [],
  selectedBase: 'recommend',
  abv: 10,
  sweetness: 3,
  sourness: 3,
  bitterness: 3,
  sparkling: null,
};

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(DEFAULT_ORDER);

  const updateOrder = (partial) => {
    setOrder((prev) => ({ ...prev, ...partial }));
  };

  const value = useMemo(() => ({ order, updateOrder }), [order]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
