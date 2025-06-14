// Types
type FormFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

type CountrySelectProps = {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
  value?: string;
};



type CounterProps = {
  count: number;
  setCount: (count: number) => void;
  label: string;
  price: string;
};

type PriceItemProps = {
  label: string;
  value: string;
  discount?: boolean;
};

type GuestOption = {
  value: string;
  label: string;
};

type CountryOption = {
  value: string;
  label: string;
  flag?: string;
};