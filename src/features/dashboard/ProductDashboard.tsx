import {
  View,
  Text,
  Button,
  SafeAreaView,
  Animated as RNAnimated,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { FC, useEffect, useRef } from "react";
import { useAuthStore } from "@state/authStore";
import { NoticeHeight } from "@utils/Scaling";
import NoticeAnimation from "./NoticeAnimation";
import Visuals from "./Visuals";
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";

import AnimatedHeader from "./AnimatedHeader";
import StickSearchBar from "./StickSearchBar";
import Content from "@components/dashboard/Content";
import CustomText from "@components/ui/Customtext";
import { RFValue } from "react-native-responsive-fontsize";
import { Fonts } from "@utils/Constants";

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickSearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            style={[styles.panelContainer, { flex: 1, paddingBottom: 20 }]}
            showsVerticalScrollIndicator={false}
          >
            <Content />
            <View style={{ backgroundColor: "#F8F8F8", padding: 20 }}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{ opacity: 0.2 }}
              >
                India's last minute app
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}
              >
                Developed By ❤️ Yogesh Das
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: "transparent",
  },
});

export default withCollapsibleContext(ProductDashboard);
