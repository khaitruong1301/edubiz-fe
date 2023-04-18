import React from "react";
import "./ChungNhan.css";
import bground from "../../assets/img/bgChungNhan.jpg";
import iCielNovecentosans from "../../assets/font/iCielNovecentosans-UltraBold.ttf";
import iCielNovecentosansRegular from "../../assets/font/iCielNovecentosans-DemiBold.ttf";
import Lobster from "../../assets/font/Lobster-Regular.ttf";
import Neutraface from "../../assets/font/Neutraface_Display_Bold.ttf";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
export default function ContentChungNhan({ chungNhan, userInfor }) {
  Font.register({ family: "iCielNovecentosans", src: iCielNovecentosans });
  Font.register({
    family: "iCielNovecentosansRegular",
    src: iCielNovecentosansRegular,
  });
  Font.register({ family: "Lobster", src: Lobster });
  Font.register({
    family: "Neutraface",
    src: Neutraface,
  });
  const styles = StyleSheet.create({
    page: {},
    username: {
      fontFamily: "Lobster",
      color: "rgb(70, 24, 21)",
      fontSize: "1.5cm",
      position: "absolute",
      textAlign: "center",
      width: "100%",

      top: "25%",
    },
    tenChungNhan: {
      fontFamily: "iCielNovecentosans",
      color: "rgb(70, 24, 21)",
      fontSize: "0.8cm",
      position: "absolute",
      textAlign: "center",
      width: "100%",
      top: "60%",
      padding: " 0cm 1.3cm",
    },
    thoiGianDaoTao: {
      fontFamily: "Neutraface",
      color: "rgb(70, 24, 21)",
      fontSize: "0.5cm",
      position: "absolute",
      textAlign: "left",
      marginLeft: "45%",

      width: "100%",
      bottom: "11%",
    },
    duration: {
      textAlign: "left",
      marginLeft: "45%",
      fontFamily: "Neutraface",
      color: "rgb(70, 24, 21)",
      fontSize: "0.5cm",
      position: "absolute",
      width: "100%",
      bottom: "17%",
    },
    soChungNhan: {
      fontFamily: "iCielNovecentosans",
      color: "rgb(70, 24, 21)",
      fontSize: "0.5cm",
      position: "absolute",
      textAlign: "left",
      marginLeft: "40%",
      width: "100%",
      bottom: "-45%",
    },
    ngayCap: {
      fontFamily: "iCielNovecentosansRegular",
      color: "rgb(70, 24, 21)",
      fontSize: "0.5cm",
      position: "absolute",
      textAlign: "left",
      marginLeft: "34%",
      width: "100%",
      bottom: "-49%",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="portrait">
        <Image
          style={{
            position: "absolute",
            top: "0%",
            bottom: "0",
            left: "0%",
            right: "0",
          }}
          src={bground}
        />
        <View
          style={{
            position: "absolute",
            top: "20%",
            bottom: "30%",
            left: "0",
            right: "0",
          }}
        >
          <Text style={styles.username}>{userInfor.hoTen}</Text>
          <Text style={styles.tenChungNhan}>{chungNhan.tenChungNhan}</Text>
          <Text style={styles.duration}>{chungNhan.thoiGianDaoTao} months</Text>
          <Text style={styles.thoiGianDaoTao}>
            {chungNhan.thoiGianDaoTao} tháng
          </Text>
          <Text style={styles.soChungNhan}>{chungNhan.soChungNhan}</Text>
          <Text style={styles.ngayCap}>{chungNhan.ngayCap}</Text>
        </View>
      </Page>
    </Document>
  );
}
