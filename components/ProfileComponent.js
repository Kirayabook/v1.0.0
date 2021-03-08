import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileComponent = props => {
    return (
        <View style={{marginTop: 20, marginHorizontal: 10, borderRadius: 15, backgroundColor: 'white' }}>
            <TouchableOpacity style={{justifyContent: 'space-between', flexDirection:'row', paddingRight: 20}} onPress={props.onPress} >
                <View style={{ flexDirection:'row'}}>
                <Ionicons name={props.icon} size={26} style={{marginTop: 18, color:props.color, paddingHorizontal: 8}} />
                <View>
                <Text style={{fontSize: 18, marginHorizontal: 10, marginTop: 10, ...props.titleStyle}}>{props.title}</Text>
                <Text style={{fontSize: 16, marginHorizontal: 10, color: '#aaa', paddingBottom: 4}}>{props.description}</Text>
                </View>
                </View>
                <Ionicons name='chevron-forward' size={35} style={{marginTop: 12, color: '#aaa'}} />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileComponent;