import moment from 'moment';
import { Images } from '../style/images';

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

