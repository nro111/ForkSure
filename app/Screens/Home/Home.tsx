import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { PieChart, BarChart } from "react-native-svg-charts";
import { Card, ProgressBar, Title } from 'react-native-paper';

type HomeScreenProps = { navigation: DrawerNavigationProp<RootStackParamList, "Dashboard"> };

const Home = ({ navigation }: HomeScreenProps) => {
    const [nutritionData, setNutritionData] = useState({
        calories: 2200,
        protein: 150,
        carbs: 250,
        fats: 80,
    });

    const data = [
        { key: 1, amount: 40, svg: { fill: "#600080" } },
        { key: 2, amount: 30, svg: { fill: "#9900cc" } },
        { key: 3, amount: 20, svg: { fill: "#c61aff" } },
        { key: 4, amount: 10, svg: { fill: "#d966ff" } },
    ];

    const [waterIntake, setWaterIntake] = useState(2.5); // In liters

    useEffect(() => {
        loadData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadData(); // Refresh when screen is focused
        }, [])
    );

    const loadData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('nutritionData');
            if (savedData) {
                setNutritionData(JSON.parse(savedData));
            }

            const savedWater = await AsyncStorage.getItem('waterIntake');
            if (savedWater) {
                setWaterIntake(parseFloat(savedWater));
            }
        } catch (error) {
            console.log('Error loading data:', error);
        }
    };

    const totalCalories = 2200;
    const dailyGoal = 2500;
    const nutrientData1 = [
        { value: 120, svg: { fill: "#4CAF50" }, key: "Protein" }, // Green
        { value: 200, svg: { fill: "#FF9800" }, key: "Carbs" }, // Orange
        { value: 80, svg: { fill: "#F44336" }, key: "Fats" }, // Red
    ];
    const weeklyCalories = [1800, 2100, 2300, 1950, 2200, 2500, 2400];

    return (
        <ScrollView style={styles.container}>
            {/* Summary Cards */}
            <View style={styles.row}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title>Total Calories</Title>
                        <Text>{totalCalories} kcal</Text>
                    </Card.Content>
                </Card>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title>Goal</Title>
                        <Text>{dailyGoal} kcal</Text>
                    </Card.Content>
                </Card>
            </View>

            {/* Pie Chart for Nutrient Breakdown */}
            <Card style={styles.chartCard}>
                <Card.Content>
                    <Title>Nutrient Breakdown</Title>
                    <PieChart
                        style={styles.chart}
                        data={nutrientData1}
                        innerRadius="50%"
                        outerRadius="100%"
                        labelRadius="50%"
                        padAngle={0.05}
                    />
                    <View style={styles.legend}>
                        {nutrientData1.map((item) => (
                            <View key={item.key} style={styles.legendItem}>
                                <View style={[styles.colorBox, { backgroundColor: item.svg.fill }]} />
                                <Text>{item.key}</Text>
                            </View>
                        ))}
                    </View>
                </Card.Content>
            </Card>

            {/* Bar Chart for Weekly Calories */}
            <Card style={styles.chartCard}>
                <Card.Content>
                    <Title>Calories Over the Week</Title>
                    <BarChart style={styles.chart} data={weeklyCalories} svg={{ fill: "#4CAF50" }} contentInset={{ top: 20, bottom: 20 }} />
                </Card.Content>
            </Card>

            {/* Daily Progress */}
            <Card style={styles.chartCard}>
                <Card.Content>
                    <Title>Today's Progress</Title>
                    <ProgressBar progress={totalCalories / dailyGoal} color="#4CAF50" />
                </Card.Content>
            </Card>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 10,
    },
    chartCard: {
        marginVertical: 10,
        padding: 10,
    },
    chart: {
        height: 200,
    },
    legend: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    colorBox: {
        width: 12,
        height: 12,
        marginRight: 5,
    },
});

export default Home;
