import { Image, ImageProps } from 'react-bootstrap';

export const WeatherIcon = (props: {
  icon: string;
  image?: ImageProps & React.RefAttributes<HTMLImageElement>;
}) => {
  return (
    <Image
      {...props.image}
      src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
    />
  );
};
