import { useTheme as nativeUseTheme } from '@react-navigation/native';
import { CustomDefaultTheme, CustomDarkTheme } from '../style/themes';

export const useTheme = () => {
    const { dark } = nativeUseTheme();
    return dark ? CustomDarkTheme : CustomDefaultTheme;
};
