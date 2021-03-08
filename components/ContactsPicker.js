import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

const ContactsPicker = (props) => {
    const contactData = props.navigation.getParam('contactData');
    const filterContacts = contactData.filter(contact => contact.phoneNumbers !== undefined);
    const [contacts, setContacts] = useState(filterContacts);
    const [inMemory, setInMemory] = useState(contacts);
    const [text, setText] = useState();
    contacts.sort((a, b) => a.name.localeCompare(b.name));

    const renderContactHandler = (itemData) => {
        return (
            <View style={styles.rootContainer}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('newUnit', { selectedName: itemData.item.name, selectedPhone: itemData.item.phoneNumbers[0].number })}} style={styles.contactItem}>
                    {itemData.item.image !== undefined ? <Image style={styles.image} source={{ uri: itemData.item.image.uri }} /> : <Image style={styles.image} source={{ uri: 'https://static.thenounproject.com/png/2366460-200.png '}} />}
                    <View style={styles.infoContainer}>
                        {itemData.item.name !== undefined && <Text style={styles.name}>{itemData.item.name}</Text>}
                        {itemData.item.phoneNumbers[0].number !== undefined ? <Text style={styles.number}>{itemData.item.phoneNumbers[0].number}</Text> : null}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const searchContacts =(text) => {
        setText(text);
        const filteredContacts = inMemory.filter(
            contact => {
                let contactLowercase = (contact.name).toLowerCase();
                let searchTermLowercase = text.toLowerCase();

                return contactLowercase.indexOf(searchTermLowercase) > -1
            }
        )
        setContacts(filteredContacts);
    }

    return (
        <View style={{flex: 1}}> 
            <SearchBar
                palceholder="Search Contacts"
                style={{color: 'white'}}
                onChangeText= {text => searchContacts(text)}
                value={text}
            />
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={renderContactHandler}
            />
        </View>      
    );
};

const styles = StyleSheet.create({
    rootContainer: {
        // flex: 1,
    },
    contactItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ccc',
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
    },
    number: {
        color: '#666',
        fontSize: 16
    }
});

export default ContactsPicker;