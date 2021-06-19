/**
 * Sample React Native AuthNavigator
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'

import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {enableScreens} from 'react-native-screens'
import {createNativeStackNavigator} from 'react-native-screens/native-stack'
import EntryPoint from './EntryPoint'
import Store from '../../store/Store'

enableScreens()
const Stack = createNativeStackNavigator()

function DetailsScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Detail', {count: 1})}>
                <Text>Detail Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

const Detail = ({route, navigation}) => {
    const {count} = route.params
    return (
        <>
            <TouchableOpacity onPress={() => navigation.popToTop('Home')} style={{backgroundColor: 'yellow', flex: 1}}>
                <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.push('Detail', {count: count + 1})}
                style={{backgroundColor: 'blue', flex: 1}}>
                <Text>Detail {count}</Text>
            </TouchableOpacity>
        </>
    )
}
import * as Selector from '../../store/Selector'
import UserSlice from '../../store/slices/UserSlice'
import {connect} from 'react-redux'

const makeMapSateToProps = () => {
    const getUser = Selector.getUser()
    const mapStateToProps = (state, props) => {
        return {
            user: getUser(state, props),
        }
    }
    return mapStateToProps
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: data => {
            dispatch(UserSlice.actions.setUser(data))
        },
    }
}

// const MappedEntryPoint = connect(makeMapSateToProps, mapDispatchToProps)(EntryPoint)

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="EntryPoint"
                component={EntryPoint}
                initialParams={{itemId: 42}}
                options={{headerShown: false}}
            />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
