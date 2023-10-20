import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        primary: '#9134E1',
        secondary: '#a378eb',
        dark_grey: '#707070',
        grey: '#B4B4B4',
        white: '#FAFAFA',
        black: '#111417',
        red: '#EE8187',
        text: '#111417',
        button: '#111417',
        buttonText: '#FAFAFA',
        border: '#EAEAEA',
        seperator: '#B4B4B4',
        ovalButtonTextColor: '#fff',
    },
    borderRadius: {
        input: 8,
        card: 10,
        button: 8,
        tag: 4,
    },
};

export const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        primary: '#9134E1',
        secondary: '#a378eb',
        dark_grey: '#707070',
        grey: '#B4B4B4',
        white: '#FAFAFA',
        black: '#111417',
        red: '#EE8187',
        card: '#111417',
        button: '#FAFAFA',
        buttonText: '#111417',
        border: '#3a3b3c',
        seperator: '#3a3b3c',
        ovalButtonTextColor: '#000',
    },
    borderRadius: {
        input: 10,
        card: 10,
        button: 8,
        tag: 4,
    },
};
