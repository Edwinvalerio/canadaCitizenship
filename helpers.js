import question from "./all_questions";
import answersList from "./all_answers";
import Constants from "expo-constants";
// TEST ads UID = ca-app-pub-3940256099942544/6300978111
// export const ads_Interstitial_id = "ca-app-pub-6057363877580246/8756876087";
// export const ads_banner_id = "ca-app-pub-3940256099942544/6300978111"; //original -> ca-app-pub-6057363877580246/1962159600"; // test -> "ca-app-pub-3940256099942544/6300978111";
const productionIDBanner = "ca-app-pub-6057363877580246/1264571863";
const productionIDInterstitial = "ca-app-pub-6057363877580246/2321287644";
const productionRewardedInterstitial = "ca-app-pub-6057363877580246/4755879292";
const testRewardedInterstitial = "ca-app-pub-3940256099942544/5224354917";
const testIDBanner = "ca-app-pub-3940256099942544/2934735716";
const testIDInterstitial = "ca-app-pub-3940256099942544/4411468910";

// Is a real device and running in production.
const adUnitIDBanner = Constants.isDevice && !__DEV__ ? productionIDBanner : testIDBanner;
const adUnitIDInterstitial = Constants.isDevice && !__DEV__ ? productionIDInterstitial : testIDInterstitial;
const adUnitIDRewardedInterstitial = Constants.isDevice && !__DEV__ ? productionRewardedInterstitial : testRewardedInterstitial;

export const configurations = {
  adUnitIDRewardedInterstitial: adUnitIDRewardedInterstitial,
  ads_banner_id: adUnitIDBanner,
  ads_Interstitial_id: adUnitIDInterstitial,
  ads_Interstitial_show_percentage: 50,
  passing_percentage: 75,
  total_questions: 20,
};
export const background_image = { uri: "https://images.pexels.com/photos/3744699/pexels-photo-3744699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };
export function generateQuestions() {
  const isSeen = {};
  let random = Math.floor(Math.random() * question.length - 1) + 1;
  let randomAnswers = [];
  for (let i = 0; i < 3; i++) {
    // VERIFY THAT THE RANDOM ANSWER PICKED IS NOT EQUAL TO THE CORRECT ANSWER / TO PREVERNT DUPLICATES ANSWERS
    const random_answer_picked = answersList[Math.floor(Math.random() * answersList.length - 1) + 1];
    if (!isSeen[random_answer_picked]) {
      randomAnswers.push(random_answer_picked);
      isSeen[random_answer_picked] = true;
    } else {
      i--;
    }
  }
  randomAnswers.push(question[random].correnctAnswer);
  question[random].answers = randomAnswers;

  return question[random];
}

export function getCurrentDate() {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return month + "-" + date + "-" + year; //format: dd-mm-yyyy;
}
