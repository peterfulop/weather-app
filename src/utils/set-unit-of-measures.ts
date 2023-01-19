import { Unit } from '../enums/unit.enum';

export const setUnit = (input: number, unit: Unit): string => {
  let value = String(input);
  switch (unit) {
    case Unit.CELSIUS:
      value = value.concat(Unit.CELSIUS);
      break;
    case Unit.PRESSURE:
      value = value.concat(Unit.PRESSURE);
      break;
    case Unit.PERCENTAGE:
      value = value.concat(Unit.PERCENTAGE);
      break;
  }
  return value;
};
