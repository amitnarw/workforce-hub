import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";

// Demo credentials
const DEMO_EMPLOYEE = {
  email: "employee@demo.com",
  password: "demo123",
  route: "MainTabs",
};

const DEMO_TEAM_LEAD = {
  email: "lead@demo.com",
  password: "lead123",
  route: "TeamLeadDashboard",
};

const DEMO_ADMIN = {
  email: "admin@demo.com",
  password: "admin123",
  route: "AdminDashboard",
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      if (email === DEMO_EMPLOYEE.email && password === DEMO_EMPLOYEE.password) {
        navigation.reset({
          index: 0,
          routes: [{ name: DEMO_EMPLOYEE.route }],
        });
      } else if (email === DEMO_TEAM_LEAD.email && password === DEMO_TEAM_LEAD.password) {
        navigation.reset({
          index: 0,
          routes: [{ name: DEMO_TEAM_LEAD.route }],
        });
      } else if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
        navigation.reset({
          index: 0,
          routes: [{ name: DEMO_ADMIN.route }],
        });
      } else {
        Alert.alert(
          "Login Failed",
          "Invalid credentials.\n\nDemo accounts:\n• employee@demo.com / demo123\n• lead@demo.com / lead123\n• admin@demo.com / admin123"
        );
      }
    } else {
      // Bypass login — go to employee dashboard by default
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }
  };

  const handleSSO = () => {
    console.log("SSO Login");
  };

  const handleEmployeeDemo = () => {
    setEmail(DEMO_EMPLOYEE.email);
    setPassword(DEMO_EMPLOYEE.password);
  };

  const handleTeamLeadDemo = () => {
    setEmail(DEMO_TEAM_LEAD.email);
    setPassword(DEMO_TEAM_LEAD.password);
  };

  const handleAdminDemo = () => {
    setEmail(DEMO_ADMIN.email);
    setPassword(DEMO_ADMIN.password);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.mainContainer}>
          <View style={styles.contentWrapper}>
            {/* Login Card - matches Stitch: white card with 32px top rounded corners */}
            <View style={[styles.loginCard, { backgroundColor: colors.surfaceContainerLowest }]}>
              <View style={styles.formContainer}>
                {/* Header - from Stitch */}
                <View style={styles.headerSection}>
                  <Text style={[styles.welcomeText, { color: colors.onSurface }]}>
                    Welcome Back
                  </Text>
                  <Text style={[styles.subtitleText, { color: colors.onSurfaceVariant }]}>
                    Sign in to continue
                  </Text>
                </View>

                {/* Email Field */}
                <View style={styles.inputGroup}>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.surfaceContainerHigh }
                  ]}>
                    <MaterialIcons
                      name="mail"
                      size={20}
                      color={colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.textInput, { color: colors.onSurface }]}
                      placeholder="Email address"
                      placeholderTextColor={colors.outline}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View style={styles.inputGroup}>
                  <View style={[
                    styles.inputContainer,
                    { backgroundColor: colors.surfaceContainerHigh }
                  ]}>
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.textInput, { color: colors.onSurface }]}
                      placeholder="Password"
                      placeholderTextColor={colors.outline}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <Pressable
                      style={styles.visibilityToggle}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility-off" : "visibility"}
                        size={20}
                        color={colors.outline}
                      />
                    </Pressable>
                  </View>
                  {/* Forgot Password - aligned right */}
                  <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  style={styles.loginButtonWrapper}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryContainer]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.loginButton}
                  >
                    <Text style={[styles.loginButtonText, { color: colors.onPrimary }]}>
                      Log In
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider - matches Stitch "or" style */}
                <View style={styles.divider}>
                  <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
                  <Text style={[styles.dividerText, { color: colors.outline }]}>or</Text>
                  <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
                </View>

                {/* SSO Button */}
                <TouchableOpacity
                  style={[
                    styles.ssoButton,
                    {
                      backgroundColor: colors.surfaceContainerLow,
                      borderColor: colors.outlineVariant,
                    },
                  ]}
                  onPress={handleSSO}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcDXWCoiS-VnEk3W5tzdNTMUiGBlKlq3nq4sYOrQAFtYowJjyiLxGrP4KMGJpeS1CHcXuf2UWXxDg0xqzUU5Zpf5hi6G9tRA8P4v6eHqS86C8T6oiM_G6Pr2XxGHxnRriUQx_VJdkhzxIsmXSAxlUkKjhguMobm9f7fNFgIwOMNBtEtcvf9R_FMDYzPK_-rkUTGlfN-GnirteP5LT5uCfyNlZ9Wtecq6uXb-NVWl_lkQ9nBphDX1dzHfQa9pxy0C6tqhZdkTPRGA",
                    }}
                    style={styles.googleLogo}
                  />
                  <Text style={[styles.ssoButtonText, { color: colors.onSurface }]}>
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                {/* Footer - Copyright */}
                <View style={styles.footer}>
                  <Text style={[styles.copyrightText, { color: colors.outline }]}>
                    © 2024 Workforce Hub Operations. All Rights Reserved.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface LoginScreenProps {
  navigation?: any;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 440,
  },
  loginCard: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  formContainer: {
    padding: 24,
    paddingBottom: 16,
    gap: 20,
  },
  headerSection: {
    gap: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  welcomeText: {
    fontFamily: "Manrope",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitleText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
  },
  inputGroup: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    height: 52,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: "Inter",
    fontSize: 14,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  visibilityToggle: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  loginButtonWrapper: {
    marginTop: 4,
  },
  loginButton: {
    height: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0037b0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 16,
  },
  ssoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  ssoButtonText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  demoButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  demoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
  },
  demoButtonText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingTop: 16,
  },
  copyrightText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
  },
});
