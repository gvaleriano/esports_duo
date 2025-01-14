import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Text } from 'react-native'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';


interface RouteParams {
    id: string;
    title: string;
    bannerUrl: string
}

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([])

    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams

    function handleGoBack() {
        navigation.goBack();
    }

    useEffect(() => {
        fetch(`http://192.168.15.2:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data));
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo
                            name="chevron-thin-left"
                            color={THEME.COLORS.CAPTION_300}
                            size={20}
                        />
                    </TouchableOpacity>
                    <Image
                        source={logoImg}
                        style={styles.logo}
                    />

                    <View style={styles.right} />
                </View>
                <Image
                    source={{ uri: game.bannerUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                />
                <Heading title={game.title} subTitle="Conecte-se e comece a jogar" />
                <FlatList
                    data={duos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <DuoCard data={item}
                            onConnect={() => { }}
                        />
                    )}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerList}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda.
                        </Text>
                    )}
                >

                </FlatList>

            </SafeAreaView>
        </Background>
    );
}