import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik'
import * as yup from 'yup';

import { COLORS, FONTS, images, SIZES } from '../constants';
import { AuthContext } from '../contexts/AuthContext';
import CustomTextInput from './commons/CustomTextInput';
import CustomButton from './commons/CustomButton';

let schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

// @refresh reset
const SignIn = () => {
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={styles.bgLogin}
                source={images.bgLogin}
            >
                <View style={styles.containerFormLogin}>
                    <Text style={styles.text_header}>Welcome</Text>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            signIn(values.username, values.password);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
                            <>
                                <CustomTextInput
                                    label="Username"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    touched={touched.username}
                                    error={errors.username}
                                />

                                <CustomTextInput
                                    label="Password"
                                    secureTextEntry={isSecureEntry}
                                    icon={
                                        <TouchableOpacity
                                            onPress={() => {
                                                setIsSecureEntry((prev) => !prev);
                                            }}>
                                            <Icon name={isSecureEntry ? 'eye' : 'eye-slash'} size={SIZES.body3} color={COLORS.primary} />
                                        </TouchableOpacity>
                                    }
                                    iconPosition="right"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    touched={touched.password}
                                    error={errors.password}
                                    containerStyle={{ marginTop: 12 }}
                                />

                                <CustomButton 
                                    containerStyle={styles.container_sign_in}
                                    buttonStyle={styles.sign_in}
                                    titleStyle={styles.text_sign_in}
                                    title="Sign In"
                                    onPress={handleSubmit}
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgLogin: {
        flex: 1
    },
    containerFormLogin: {
        width: '100%',
        height: '75%',
        bottom: 0,
        position: 'absolute',
        paddingHorizontal: 40
    },
    text_header: {
        ...FONTS.h1,
        color: COLORS.primary,
        marginBottom: 35
    },
    footer: {
        flex: 2,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    // label: {
    //     ...FONTS.body3,
    //     color: COLORS.lightGray,
    //     marginBottom: 10
    // },
    // input: {
    //     backgroundColor: COLORS.lightGray2,
    //     paddingHorizontal: 15,
    //     borderRadius: 8,
    //     color: COLORS.lightGray,
    //     ...FONTS.body3,
    // },
    container_sign_in: {
        marginTop: 24
    },
    sign_in: {
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_sign_in: {
        ...FONTS.h3,
        color: COLORS.white
    }
})
