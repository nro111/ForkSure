// import React, { useRef, useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { Camera, CameraView } from "expo-camera";
// import RBSheet from "react-native-raw-bottom-sheet";
// import SuccessSheet from "../BottomSheet/SuccessSheet";
// import Icon from "react-native-vector-icons/Feather";
// import AzureServices from "../../Service/AzureServices";
// import FirebaseServices from "../../Service/FirebaseServices";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { StackScreenProps } from "@react-navigation/stack";
// import { RootStackParamList } from "../../Navigations/RootStackParamList";
// import { AnalyzedDocument, AnalyzeResult } from "@azure/ai-form-recognizer";
// import Utils from '../../utilities/utils'
// import { DocumentArrayField } from "@azure/ai-form-recognizer";

// type SignInScreenProps = StackScreenProps<RootStackParamList, "CameraComponent">;

// const CameraComponent = ({ navigation }: SignInScreenProps) => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [cameraRef, setCameraRef] = useState<any | null>(null);
//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [bottomSheetHeader, setBottomHeader] = useState("Failed");
//   const [bottomSheetText, setBottomText] = useState("Receipt Upload Failed");
//   const [bottomSheetSuccess, setBottomSuccess] = useState(false);


//   const rbSheetRef = useRef(null) // Ref for RBSheet
  
//   useEffect(() => { (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");

//       const auth = getAuth();

//       // Listen to the user's authentication state
//       onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           // User is not logged in - navigate back to login
//           navigation.replace('SignIn')
//         }
//       });

//     })();
//   }, []);

//   const handleCapture = async () => {
//     if (cameraRef) {
//       try {
        
//         // take picture
//         const photo = await cameraRef.takePictureAsync({
//           quality: 0.8, // Set quality to 80%
//           mute: true, 
//           enableTourch: true
//         });

//         // Save image locally for preview
//         setPhotoUri(photo.uri); 

//         // show processing graphic
//         setRefreshing(true);

//         // Upload image to Firebase
//         const fbImageUrl = await FirebaseServices.saveImageToFirebase(photo.uri); 

//         // send receipt image url to azure for analysis
//         const rawReceiptDetails = await AzureServices.analyzeDocument(fbImageUrl);

//         // parse data from raw receipt details
//         const parsedReceiptDetails = extractReceiptDetails(rawReceiptDetails, fbImageUrl); 
        
//         let isSaved = false;
//         let isDuplicate = false;
//         let isReceiptValid = false;
        
//         // check if receipt is valid
//         isReceiptValid = validateReceipt(parsedReceiptDetails);

//         if (isReceiptValid){
//           // check if receipt alread exists
//           isDuplicate = await FirebaseServices.checkReceiptExists(parsedReceiptDetails);

//           if (!isDuplicate) {
//             // save receipt details
//             isSaved = await FirebaseServices.saveReceiptDetails(parsedReceiptDetails);
//           } 
//         }

//         // if not duplicate and successfully saved, show success message
//         if (!isDuplicate && isSaved) {
//            // show success sheet
//            setBottomHeader("Congratulations!")
//            setBottomText("Receipt Successfully Uploaded")
//            setBottomSuccess(true)
//         }
//         else if(!isReceiptValid) {
//           // show warning sheet
//           setBottomHeader("Error!")
//           setBottomText("Unable To Read Receipt Details")
//           setBottomSuccess(false)
//         }
//         else if(isDuplicate) {
//           // show error sheet
//           setBottomHeader("Error!")
//           setBottomText("Duplicate Receipt Found In System")
//           setBottomSuccess(false)
//         }

//         // hide processing graphic
//         setRefreshing(false);

//         // show bottom sheet
//         rbSheetRef.current?.open();
//       } catch (error) {
//         // show bottom sheet
//         rbSheetRef.current?.open();
//         console.error(error);
//       }
//       finally {
//         // hide refresh graphic
//         setRefreshing(false);
        
//         setTimeout(() => {
//           setPhotoUri(null);

//           // hide bottom sheet
//           rbSheetRef.current?.close();
//         }, 2000);
//       }
//     }
//   };

//   const validateReceipt = (receipt: any): boolean => {
//     if (receipt.merchantName === "Unknown" || receipt.transactionDate === "" || receipt.total == null)
//       return false;
//     return true;
//   };

//   const extractReceiptDetails = (receipt: AnalyzeResult<AnalyzedDocument> | undefined, imageUrl: string) => {
//     if (!receipt || !receipt.documents || receipt.documents.length === 0) {
//       throw new Error("Invalid receipt data.");
//     }

//     // Extract receipt fields (example: merchant name, total, etc.)
//     const document = receipt.documents[0];
//     const fields = document.fields;
//     const items = receipt?.documents[0]?.fields?.Items as DocumentArrayField

//     const transactionData = {
//       userId: getAuth().currentUser?.uid,
//       merchantName: fields["MerchantName"]?.content || "Unknown",
//       merchantAddress: fields["MerchantAddress"]?.content || "Unknown",
//       transactionDate: Utils.formatToISODate(fields["TransactionDate"]?.content || ""),
//       transactionTime: fields["TransactionTime"]?.content,
//       total: Utils.formatPrice(fields["Total"]?.content),
//       createdAt: new Date().toISOString(),
//       receiptUri: imageUrl,

//       // custom data fields
//       customerName: getCustomData(receipt, 'name', 'Unknown'),
//       transaction: getCustomData(receipt, 'Transaction', '0000'),

//       Items: items.values.map((item: any) => ({
//         name: item.properties?.Description?.content || "Unknown Item",
//         quantity: item.properties?.Quantity?.content || "1",
//         price: item.properties?.TotalPrice?.content || "0.00",
//       }))
//     };

//     return transactionData
//   }

//   const getCustomData = (analysisResult: AnalyzeResult<AnalyzedDocument>, customField: string, defaultValue: string): string => {
//     const rawText = analysisResult.content;
//     //console.log("Raw Text:", rawText);
    
//     // extract custom fields
//     const regex = new RegExp(`${customField}\\s*(.*)`, "i");
//     const customFieldMatch = rawText.match(regex);
//     const customFieldValue = customFieldMatch ? customFieldMatch[1] : "";
    
//     if (customFieldValue == "" || customFieldValue == ":"){
//         const regex = new RegExp(`${customField}:\\s*(.*)`, "i");
//         const customFieldMatch = rawText.match(regex);
//         const customFieldValue = customFieldMatch ? customFieldMatch[1] : "";

//         if (customFieldValue == "")
//             return defaultValue
//         return customFieldValue
//     }
//     else {
//         return customFieldValue;
//     }
// }

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }  

//   return (
    
//     <View style={styles.container}>
//       {!photoUri ? (
//         <CameraView style={styles.camera} ref={(ref: any) => setCameraRef(ref)}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
//             <Icon name="camera" size={30} style={styles.captureButton} />
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       ) : (
//         <View style={styles.previewContainer}>
//           <Image source={{ uri: photoUri }} style={styles.previewImage} />
          
//           {/* Show loading spinner over the preview container if refreshing is true */}
//           {refreshing && (
//             <View style={styles.spinnerOverlay}>
//               <ActivityIndicator size="large" color="#ffffff" />
//             </View>
//           )}
//         </View>
//       )}

//       {/* Bottom Sheet for Success */}
//       <RBSheet
//         ref={rbSheetRef}
//         height={300} // Height of the bottom sheet
//         openDuration={250} // Animation duration
//         customStyles={{
//           container: {
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             padding: 16, // Optional for content padding
//           },
//         }}
//       >
//         <SuccessSheet 
//           headerText={bottomSheetHeader} 
//           bodyText={bottomSheetText} 
//           messageSuccess={bottomSheetSuccess} />
//       </RBSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   captureButton: {
//     backgroundColor: "tomato",
//     padding: 5,
//     borderRadius: 50,
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   previewImage: {
//     width: "90%",
//     height: "70%",
//     borderRadius: 10,
//   },
//   spinnerOverlay: {
//     position: 'absolute', // Position the spinner on top of the image
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add a dark overlay for better visibility
//     borderRadius: 10,
//   },
// });

// export default CameraComponent;
