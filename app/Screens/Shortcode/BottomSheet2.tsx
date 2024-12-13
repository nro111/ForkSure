import { View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ShortSheet2 from '../../components/BottomSheet/ShortShreet';
import Jobtitle2 from '../../components/BottomSheet/Jobtitle';
import ExperienceSheet from '../../components/BottomSheet/Experience';
import LocationSheet from '../../components/BottomSheet/Location';
import SalarySheet from '../../components/BottomSheet/Salary';
import WorkingModeSheet from '../../components/BottomSheet/WorkingMode';
import SetsalarySheet from '../../components/BottomSheet/Setsalary';


type Props = {
   height ?: string
}

const BottomSheet2 = forwardRef((Props, ref) => {

    const theme = useTheme();
    const {colors}:{colors : any} = theme;

    const rbsheetRef = useRef<any>();

    const [sheetType, setSheetType ] = useState<any>('');
    
    useImperativeHandle(ref, () => ({

        openSheet : async (value:string) => {
            await setSheetType(value);
            await rbsheetRef.current.open();
        },
        closeSheet() {
            rbsheetRef.current.close();
        }
    
    }));

    return(
        <>
            <RBSheet
                ref={rbsheetRef}
                closeOnDragDown={true}
                height={sheetType === "job" ? 330 :
                        sheetType === "short" ? 300 :
                        sheetType === "Experience" ? 330 :
                        sheetType === "Location" ? 440 :
                        sheetType === "Salary" ? 360 :
                        sheetType === "WorkingMode" ? 270 :
                        sheetType === "Setsalary" ? 300 : 200}
                openDuration={100}
                customStyles={{
                    
                    container: {
                        backgroundColor: colors.card,
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10
                    },
                    draggableIcon: {
                        marginTop:10,
                        marginBottom:0,
                        height:5,
                        width:92,
                        backgroundColor: theme.dark ? 'rgba(255,255,255,0.30)' : 'rgba(0, 0, 0, 0.30)',
                    }
                }}
            >
                {(sheetType === "job") &&
                    <Jobtitle jobRef={rbsheetRef} />
                }
                {(sheetType === "short") &&
                    <ShortSheet ShortRef={rbsheetRef}/>
                }
                {(sheetType === "Experience") &&
                    <Experience ExperienceRef={rbsheetRef}/>
                }
                {(sheetType === "Location") &&
                    <Location LocationRef={rbsheetRef}/>
                }
                {(sheetType === "Salary") &&
                    <Salary SalaryRef={rbsheetRef}/>
                }
                {(sheetType === "WorkingMode") &&
                    <WorkingMode WorkingModeRef={rbsheetRef}/>
                }
                {(sheetType === "Setsalary") &&
                    <Setsalary setSelectSalary={Props.setSelectSalary} SetsalaryRef={rbsheetRef}/>
                }
            </RBSheet>
        </>
    )
});


const ShortSheet = ({ ShortRef }: { ShortRef : any} ) => {
    return(
        <View>
            <ShortSheet2
                shortRef={ShortRef}
            />
        </View>
    )
}

const Jobtitle = ({ jobRef } : { jobRef : any}) => {
    return(
        <View>
            <Jobtitle2
                jobRef={jobRef}
            />
        </View>
    )
}

const Experience = ({ ExperienceRef } : { ExperienceRef : any}) => {
    return(
        <View>
            <ExperienceSheet
                ExperienceRef={ExperienceRef}
            />
        </View>
    )
}

const Location = ({ LocationRef } : { LocationRef : any}) => {
    return(
        <View>
            <LocationSheet
                LocationRef={LocationRef}
            />
        </View>
    )

}

const Salary = ({ SalaryRef } : { SalaryRef : any}) => {
    return(
        <View>
            <SalarySheet
                SalaryRef={SalaryRef}
            />
        </View>
    )

}

const WorkingMode = ({ WorkingModeRef } : { WorkingModeRef : any}) => {
    return(
        <View>
            <WorkingModeSheet
                WorkingModeRef={WorkingModeRef}
            />
        </View>
    )

}
const Setsalary = ({ SetsalaryRef,setSelectSalary } : { SetsalaryRef : any; setSelectSalary: any}) => {
    return(
        <View>
            <SetsalarySheet
                SetsalaryRef={SetsalaryRef}
                setSelectSalary={setSelectSalary}
            />
        </View>
    )
}


export default BottomSheet2;