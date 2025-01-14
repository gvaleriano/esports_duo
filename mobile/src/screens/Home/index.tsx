import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';


export function Home() {

    useEffect(() => {
        fetch('http://192.168.15.2:3333/games')
            .then(response => response.json())
            .then(data => setGames(data));
    }, [])

    const [games, setGames] = useState<GameCardProps[]>([]);

    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
        navigation.navigate('game', { id, title, bannerUrl });
    }

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo} />
                <Heading
                    title="Encontre seu DUO"
                    subTitle="Selecione o jogo que deseja jogar..."
                />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />

            </SafeAreaView>
        </Background>
    );
}