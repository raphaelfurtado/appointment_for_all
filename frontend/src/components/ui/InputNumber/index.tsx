import React from 'react';
import NumberFormat from 'react-number-format';

const InputNumber: React.FC = () => {
  const [servicePrice, setServicePrice] = React.useState<string>('');

  const handlePriceChange = (value: { floatValue: number }) => {
    setServicePrice(value.floatValue.toFixed(2)); // Formata para 2 casas decimais
  };

  return (
    <NumberFormat
      value={servicePrice}
      onValueChange={handlePriceChange}
      placeholder="Preço"
      allowNegative={false} // Impede valores negativos
      thousandSeparator="." // Separador de milhar
      decimalSeparator="," // Separador decimal
      decimalScale={2} // Número de casas decimais
      fixedDecimalScale // Fixa o número de casas decimais
      prefix="R$" // Adiciona um prefixo, como "R$"
    />
  );
};

export default InputNumber;
