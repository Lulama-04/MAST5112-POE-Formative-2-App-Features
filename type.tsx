import React from "react";

export type CourseMenu = {
    dishName: string;
    description: string;
    category: string | null;
    cuisine: string;
    price: number;
    intensity: string;
    image: string | null;
    ingredients: string[];
};
 export type RootStackParamList = {
    WelcomeScreen: undefined;
    HomeScreen: undefined;
    ManageScreen:{
        item: CourseMenu[];
        setItem: React.Dispatch<React.SetStateAction<CourseMenu[]>>;
    };
 };