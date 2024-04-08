import { getLocale } from '@umijs/max';
import { Form } from 'antd';
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import en from 'world_countries_lists/data/countries/en/world.json';

export const PhoneInput = (props) => {
  const getFlag = (short) => {
    const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`);
    // for dumi
    if (typeof data === 'string') {
      return data;
    }
    // for CRA
    return data.default;
  };
//   console.log(getLocale());
  
  return (
    <ConfigProvider
      areaMapper={(area) => {
        return {
          ...area,
          emoji: (
            <img
              alt="flag"
              style={{ width: 18, height: 18, verticalAlign: 'sub' }}
              src={getFlag(area.short)}
            />
          ),
        };
      }}
      locale={en}
    >
      <Form.Item
        hasFeedback
        label={props.label}
        name={props.owner}
        initialValue={{
          short: 'ke',
        }}
        rules={[
          {
            validator: async (_, value) => {
              if (
                !isValidPhoneNumber(`${value.code}${value.phone}`, value.short)
              )
                throw new Error('Invalid Phone Number');
            },
          },
        ]}
        required
      >
        <CountryPhoneInput
          inline
          autoComplete="none"
          style={{ width: `${props?.width}` }}
        />
      </Form.Item>
    </ConfigProvider>
  );
};
