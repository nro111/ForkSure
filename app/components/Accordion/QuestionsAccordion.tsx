import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { COLORS, FONTS, } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import {Feather } from "@expo/vector-icons";


const QuestionsAccordion = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections : any) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const SECTIONS = [
        {
            title: 'How do I apply for a job?',
            content: 'To apply for a job, start by preparing an updated resume that highlights your relevant skills, experience, and education. Research the company you’re interested in and tailor your resume and cover letter to the job description. ',
        },
        {
            title: 'Do I need to create an account to apply?',
            content: 'Yes, most job portals require you to create an account in order to submit applications. This helps track your application status and allows you to apply for multiple roles.',

        },
        {
            title: "What documents do I need to apply?",
            content: "To apply for a job, you typically need an updated resume and a tailored cover letter. Some positions may also require certifications, a portfolio, or references. Ensure all documents are accurate, professional, and relevant to the job you're applying for to increase your chances.",

        },
        {
            title: 'Can I apply for multiple jobs at the same time?',
            content: "Yes, you can apply for multiple jobs at the same time. However, it's important to tailor your resume and cover letter for each position. Make sure you meet the qualifications for each role and keep track of your applications to avoid confusion and present your best self to each employer.",
        },
        {
            title: 'Can I update my application after submitting it?',
            content: 'In most cases, once an application is submitted, it cannot be updated. However, some companies may allow you to resubmit or edit your application through their portal. If changes are necessary, you can contact the recruiter or hiring manager directly to provide updated information or documents.',
        },
        {
            title: 'How will I know if my application was successful?',
            content: 'You will typically receive a confirmation email after submitting your application. If your application is successful, the company will contact you for an interview or further steps. If you don’t hear back, it’s acceptable to follow up after a few weeks to check the status of your application.',

        },
        {
            title: "What should I do if I don't hear back from the employer?",
            content: "If you don’t hear back from the employer after a couple of weeks, it's a good idea to send a polite follow-up email. Reaffirm your interest in the position and ask if there are any updates regarding your application. ",

        },
        {
            title:"Can I apply for a job if I don't meet all the qualifications?",
            content: "Yes, you can apply for a job even if you don’t meet all the qualifications, especially if you have relevant experience or skills. Highlight your strengths and transferable skills in your resume and cover letter.",
        },
    ];

    const AccordionHeader = (item: any, _:any, isActive:any) => {

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 15
            }}>
                <Text style={[FONTS.fontMedium, { fontSize: 16, color:isActive ? COLORS.primary : colors.title, flex: 1,paddingRight:15 }]}>{item.title}</Text>
                <Feather name={isActive ? "arrow-up-circle" : "arrow-down-circle"} size={18} color={isActive ? COLORS.primary :colors.text} />
            </View>
        )
    }

    const AccordionBody = (item: any, _:any, isActive:any) => {
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor:theme.dark ? colors.border :colors.background,
                paddingVertical: 10,
                paddingHorizontal: 15
            }}>

                <Text style={[FONTS.fontMedium, {fontSize:14, color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
            </View>
        )
    }
    
    return (
        <>
            <Accordion
                sections={SECTIONS}
                duration={300}
                sectionContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor:theme.dark ? colors.border :colors.background,
                    marginBottom: 15,
                    backgroundColor:colors.card,
                    //paddingHorizontal: 20,
                }}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
}

export default QuestionsAccordion