import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '../../constants'

const Loading = () => {

    return (
        <ActivityIndicator size="large" color={COLORS.white} />
    )
}

export default Loading

const styles = StyleSheet.create({})
