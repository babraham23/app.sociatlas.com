// import { StyleSheet, View } from 'react-native';
// import React, { useEffect } from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import axios from 'axios';

// WebBrowser.maybeCompleteAuthSession();

// const useAuth = () => {
//     const [loading, setLoading] = React.useState(false);
//     const [userInfo, setUserInfo] = React.useState<any>(null);
//     const [_, googleResponse, googleAuth] = Google.useAuthRequest({
//         expoClientId: '526403850992-68fkf5rs5henv8kb84ar32eh6esien55.apps.googleusercontent.com',
//         // iosClientId: '526403850992-68fkf5rs5henv8kb84ar32eh6esien55.apps.googleusercontent.com',
//         // androidClientId: '526403850992-68fkf5rs5henv8kb84ar32eh6esien55.apps.googleusercontent.com',
//         // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
//         selectAccount: true,
//     });

//     const googleLoginOrRegister = async (accessToken: string) => {
//         getUserGoogleInfo(accessToken);
//         // create login mutation
//         // try {
//         //   const { data } = await axios.post(endpoints.google, {
//         //     accessToken,
//         //   });
//         //   return data;
//         // } catch (error) {
//         //   handleError(error);
//         // }
//     };

//     const handleSignInUser = (user: any) => {
//         console.log('sign in user', user);
//     };

//     const handleAuthError = () => alert('Unable to authorize');

//     const getUserGoogleInfo = async (token: any) => {
//         axios
//             .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
//             .then((res: any) => {
//                 console.log('getUserInfo res -->', res.data);
//             })
//             .catch((err: any) => {
//                 console.log('err -->', err);
//             });
//     };

//     const nativeRegister = async (values: { email: string; password: string; lastName: string; firstName: string }) => {
//         console.log('nativeLogin', values);
//         // create a login mutation
//         // try {
//         //     setLoading(true);
//         //     const user = await loginUser(values.email, values.password);
//         //     handleSignInUser(user);
//         // } catch (error) {
//         //     handleAuthError();
//         // } finally {
//         //     setLoading(false);
//         // }
//     };

//     const nativeLogin = async (values: { email: string; password: string }) => {
//         console.log('nativeLogin', values);
//         // create a login mutation
//         // try {
//         //     setLoading(true);
//         //     const user = await loginUser(values.email, values.password);
//         //     handleSignInUser(user);
//         // } catch (error) {
//         //     handleAuthError();
//         // } finally {
//         //     setLoading(false);
//         // }
//     };

//     useEffect(() => {
//         async function loginUserWithGoogle(access_token: string) {
//             try {
//                 setLoading(true);
//                 const user = await googleLoginOrRegister(access_token);
//                 handleSignInUser(user);
//             } catch (error) {
//                 handleAuthError();
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (googleResponse?.type === 'success') {
//             const { access_token } = googleResponse.params;
//             loginUserWithGoogle(access_token);
//         }
//     }, [googleResponse]);

//     return { googleAuth, nativeLogin, nativeRegister };
// };

// export default useAuth;

// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//         marginTop: 50,
//     },
//     back: {
//         marginBottom: 30,
//     },
//     button: { marginBottom: 10 },
//     inputWrapper: {
//         marginVertical: 20,
//     },
//     heading: {
//         paddingTop: 10,
//     },
//     input: {
//         paddingTop: 5,
//         paddingBottom: 5,
//     },
//     signInButton: {
//         marginTop: 30,
//     },
// });
