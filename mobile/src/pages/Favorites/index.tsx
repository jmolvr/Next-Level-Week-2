import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';


function Favorite() {
    const [favorites, setFavorites] = useState([]);
    function LoadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);

                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(() => {
        LoadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacherItem: Teacher) => {
                    return <TeacherItem key={teacherItem.id} teacher={teacherItem} favorited={true}/>
                })}
            </ScrollView>
        </View>
    )
}

export default Favorite;