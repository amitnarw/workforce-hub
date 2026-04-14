import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";

type SplashScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

// Logo piece configuration — 4 triangles that form the two overlapping squares
// Purple (back) square + Blue (front) square = overlapping logo
const LOGO_SIZE = 52;
const LOGO_RADIUS = 14;
const HALF = LOGO_SIZE / 2;

// Each piece: start offset (x, y), final position relative to center, rotation
interface LogoPiece {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startRotate: number;
  endRotate: number;
  color: string;
}

const PIECES: LogoPiece[] = [
  // Purple back square - top-left fragment
  {
    startX: -HALF - 60,
    startY: -HALF - 80,
    endX: -HALF,
    endY: -HALF,
    startRotate: -45,
    endRotate: 0,
    color: "#6c34c4",
  },
  // Purple back square - bottom-right fragment
  {
    startX: HALF + 40,
    startY: HALF + 60,
    endX: HALF,
    endY: HALF,
    startRotate: 90,
    endRotate: 0,
    color: "#6c34c4",
  },
  // Blue front square - top-right fragment
  {
    startX: HALF + 80,
    startY: -HALF - 50,
    endX: HALF - 8,
    endY: HALF - 8,
    startRotate: 60,
    endRotate: 0,
    color: "#5B8DEF",
  },
  // Blue front square - bottom-left fragment
  {
    startX: -HALF - 50,
    startY: HALF + 40,
    endX: -HALF + 4,
    endY: HALF + 4,
    startRotate: -120,
    endRotate: 0,
    color: "#5B8DEF",
  },
];

const ANIM_CONFIG = {
  ASSEMBLE_DURATION: 450,
  ASSEMBLE_EASING: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  SCALE_PULSE_DURATION: 200,
  TEXT_FADE_DURATION: 300,
  TOTAL_DURATION: 2200,
};

export default function SplashScreen({ navigation }: Props) {
  // Animation values for each piece
  const pieceAnims = PIECES.map(() => ({
    x: useRef(new Animated.Value(0)).current,
    y: useRef(new Animated.Value(0)).current,
    rotate: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(0)).current,
  }));

  // Logo container scale (for the pulse after assembly)
  const logoScale = useRef(new Animated.Value(0)).current;

  // Text animations
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const appNameTranslateY = useRef(new Animated.Value(15)).current;
  const hubBadgeOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Screen fade out
  const screenOpacity = useRef(new Animated.Value(1)).current;

  // Background pulse
  const bgPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Background subtle pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(bgPulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Logo assembly — all pieces fly in simultaneously
    const assemblyAnimations = PIECES.map((piece, i) => {
      return Animated.parallel([
        Animated.timing(pieceAnims[i].x, {
          toValue: 1,
          duration: ANIM_CONFIG.ASSEMBLE_DURATION,
          easing: ANIM_CONFIG.ASSEMBLE_EASING,
          useNativeDriver: true,
        }),
        Animated.timing(pieceAnims[i].y, {
          toValue: 1,
          duration: ANIM_CONFIG.ASSEMBLE_DURATION,
          easing: ANIM_CONFIG.ASSEMBLE_EASING,
          useNativeDriver: true,
        }),
        Animated.timing(pieceAnims[i].rotate, {
          toValue: 1,
          duration: ANIM_CONFIG.ASSEMBLE_DURATION,
          easing: ANIM_CONFIG.ASSEMBLE_EASING,
          useNativeDriver: true,
        }),
        Animated.timing(pieceAnims[i].opacity, {
          toValue: 1,
          duration: ANIM_CONFIG.ASSEMBLE_DURATION * 0.6,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
    });

    // After assembly, logo scale pulse
    const logoPulse = Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: ANIM_CONFIG.ASSEMBLE_DURATION,
        easing: ANIM_CONFIG.ASSEMBLE_EASING,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1.06,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]);

    // Staggered text reveal
    const textReveal = Animated.sequence([
      Animated.delay(ANIM_CONFIG.ASSEMBLE_DURATION + 80),
      Animated.parallel([
        Animated.timing(appNameOpacity, {
          toValue: 1,
          duration: ANIM_CONFIG.TEXT_FADE_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(appNameTranslateY, {
          toValue: 0,
          duration: ANIM_CONFIG.TEXT_FADE_DURATION + 80,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(120),
      Animated.timing(hubBadgeOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(80),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: ANIM_CONFIG.TEXT_FADE_DURATION + 50,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    // Run all animations
    Animated.parallel([...assemblyAnimations, logoPulse, textReveal], {
      stopTogether: false,
    }).start();

    // Fade out and navigate after total animation duration
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      });
    }, ANIM_CONFIG.TOTAL_DURATION);

    return () => clearTimeout(timer);
  }, []);

  // Interpolate piece positions
  const getPieceStyle = (index: number) => {
    const piece = PIECES[index];
    const anim = pieceAnims[index];
    return {
      position: "absolute" as const,
      width: HALF,
      height: HALF,
      opacity: anim.opacity,
      transform: [
        {
          translateX: anim.x.interpolate({
            inputRange: [0, 1],
            outputRange: [piece.startX, piece.endX],
          }),
        },
        {
          translateY: anim.y.interpolate({
            inputRange: [0, 1],
            outputRange: [piece.startY, piece.endY],
          }),
        },
        {
          rotate: anim.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [`${piece.startRotate}deg`, `${piece.endRotate}deg`],
          }),
        },
        {
          scale: logoScale,
        },
      ],
    };
  };

  const bgOpacity = bgPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      {/* Base gradient with animated opacity */}
      <Animated.View style={[styles.bgWrapper, { opacity: bgOpacity }]}>
        <LinearGradient
          colors={["#0d1b4b", "#1a2d6e", "#3d6dc7", "#5B8DEF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Ambient glow effects */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      {/* Center content */}
      <View style={styles.centerContent}>
        {/* Logo — animated fragments */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          {/* Piece 0: Purple top-left */}
          <Animated.View style={[styles.logoPiece, getPieceStyle(0)]}>
            <View style={[styles.pieceInner, styles.piecePurple, styles.pieceTL]} />
          </Animated.View>

          {/* Piece 1: Purple bottom-right */}
          <Animated.View style={[styles.logoPiece, getPieceStyle(1)]}>
            <View style={[styles.pieceInner, styles.piecePurple, styles.pieceBR]} />
          </Animated.View>

          {/* Piece 2: Blue top-right */}
          <Animated.View style={[styles.logoPiece, getPieceStyle(2)]}>
            <View style={[styles.pieceInner, styles.pieceBlue, styles.pieceTR]} />
          </Animated.View>

          {/* Piece 3: Blue bottom-left */}
          <Animated.View style={[styles.logoPiece, getPieceStyle(3)]}>
            <View style={[styles.pieceInner, styles.pieceBlue, styles.pieceBL]} />
          </Animated.View>
        </Animated.View>

        {/* "hub" pill badge */}
        <Animated.View style={[styles.hubBadge, { opacity: hubBadgeOpacity }]}>
          <Text style={styles.hubBadgeText}>hub</Text>
        </Animated.View>

        {/* App name */}
        <Animated.View
          style={[
            styles.textWrapper,
            {
              opacity: appNameOpacity,
              transform: [{ translateY: appNameTranslateY }],
            },
          ]}
        >
          <Text style={styles.appName}>Workforce Hub</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          OPERATIONAL EXCELLENCE
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTopRight: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#6c34c4",
    opacity: 0.15,
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#3d6dc7",
    opacity: 0.2,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: 20,
  },
  logoPiece: {
    position: "absolute",
    width: HALF,
    height: HALF,
  },
  pieceInner: {
    width: "100%",
    height: "100%",
    borderRadius: LOGO_RADIUS / 2,
  },
  piecePurple: {
    backgroundColor: "#6c34c4",
  },
  pieceBlue: {
    backgroundColor: "#5B8DEF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  pieceTL: {
    borderTopLeftRadius: LOGO_RADIUS,
  },
  pieceBR: {
    borderBottomRightRadius: LOGO_RADIUS,
  },
  pieceTR: {
    borderTopRightRadius: LOGO_RADIUS,
  },
  pieceBL: {
    borderBottomLeftRadius: LOGO_RADIUS,
  },
  textWrapper: {
    alignItems: "center",
  },
  hubBadge: {
    backgroundColor: "rgba(196, 201, 212, 0.12)",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(196, 201, 212, 0.2)",
  },
  hubBadgeText: {
    color: "#c4c9d4",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "Inter_600SemiBold",
  },
  appName: {
    color: "#ffffff",
    fontSize: 33,
    fontWeight: "800",
    fontFamily: "Manrope_800ExtraBold",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  tagline: {
    color: "#f5c842",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 4,
    fontFamily: "Inter_600SemiBold",
  },
});