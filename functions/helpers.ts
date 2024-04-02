import moment from 'moment';
import { Images } from '../style/images';
import { useTheme } from '@react-navigation/native';

export const generateID = () => {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let id = randLetter + Date.now();
    return id;
};

export const ConvertDate = (date: any) => {
    return moment(date).format('DD/MM/YYYY ');
};

export const ConvertDateadTime = (date: any) => {
    return moment(date).format('DD/MM/YYYY HH:mm');
};

export const ConvertTime = (date: any) => {
    return moment(date).format('HH:mm');
};

export const ConvertDateToName = (date: any) => {
    return moment(date).format('dddd');
};

export const SmallCardConvertDate = (date: any) => {
    return moment(date).format('dddd HH:mm');
};

export const generateReadableRandomColor = () => {
    const { dark } = useTheme();

    if (dark) {
        // Generate each color component
        const r = Math.floor(Math.random() * 156 + 100); // 100 to 255
        const g = Math.floor(Math.random() * 156 + 100); // 100 to 255
        const b = Math.floor(Math.random() * 156 + 100); // 100 to 255

        // Convert to a hexadecimal string and return
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    } else {
        // Generate each color component in the lower range for better contrast on light backgrounds
        const r = Math.floor(Math.random() * 156); // 0 to 155
        const g = Math.floor(Math.random() * 156); // 0 to 155
        const b = Math.floor(Math.random() * 156); // 0 to 155

        // Convert to a hexadecimal string and return
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
};
