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

// Design Tokens from Stitch
const colors = {
  primary: "#24389c",
  "primary-container": "#3f51b5",
  "surface-container-lowest": "#ffffff",
  "surface-container-high": "#e7e8e9",
  "surface-container-low": "#f3f4f5",
  "on-surface": "#191c1d",
  "on-surface-variant": "#454652",
  outline: "#757684",
  "outline-variant": "#c5c5d4",
  surface: "#f8f9fa",
};

const fonts = {
  headline: "Manrope",
  body: "Manrope",
  label: "Manrope",
};

// Demo credentials
const DEMO_EMPLOYEE = {
  email: "employee@demo.com",
  password: "demo123",
  route: "EmployeeDashboard",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.mainContainer}>
          <View style={styles.contentWrapper}>
            {/* Brand Section */}
            <View style={styles.brandSection}>
              <View style={styles.logoContainer}>
                <MaterialIcons name="work" size={32} color="#ffffff" />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Workforce Hub</Text>
                <Text style={styles.subtitle}>Access your operational dashboard</Text>
              </View>
            </View>

            {/* Login Card */}
            <View style={styles.loginCard}>
              <View style={styles.formContainer}>
                {/* Email Field */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="mail"
                      size={20}
                      color={colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="name@company.com"
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
                  <View style={styles.passwordHeader}>
                    <Text style={styles.label}>Password</Text>
                    <TouchableOpacity>
                      <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputContainer}>
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="••••••••"
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
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleLogin}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[colors.primary, colors["primary-container"]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.loginButton}
                    >
                      <Text style={styles.loginButtonText}>Login</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* SSO Button */}
                  <TouchableOpacity
                    style={styles.ssoButton}
                    onPress={handleSSO}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{
                        uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcDXWCoiS-VnEk3W5tzdNTMUiGBlKlq3nq4sYOrQAFtYowJjyiLxGrP4KMGJpeS1CHcXuf2UWXxDg0xqzUU5Zpf5hi6G9tRA8P4v6eHqS86C8T6oiM_G6Pr2XxGHxnRriUQx_VJdkhzxIsmXSAxlUkKjhguMobm9f7fNFgIwOMNBtEtcvf9R_FMDYzPK_-rkUTGlfN-GnirteP5LT5uCfyNlZ9Wtecq6uXb-NVWl_lkQ9nBphDX1dzHfQa9pxy0C6tqhZdkTPRGA",
                      }}
                      style={styles.googleLogo}
                    />
                    <Text style={styles.ssoButtonText}>Sign in with Single Sign-On</Text>
                  </TouchableOpacity>

                  {/* Demo Login Buttons */}
                  <View style={styles.demoButtonsRow}>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={handleEmployeeDemo}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name="badge"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.demoButtonText}>Employee</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={handleTeamLeadDemo}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name="supervisor-account"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.demoButtonText}>Team Lead</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.demoButton}
                      onPress={handleAdminDemo}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons
                        name="admin-panel-settings"
                        size={16}
                        color={colors.primary}
                      />
                      <Text style={styles.demoButtonText}>Admin</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Footer Links */}
            <View style={styles.footer}>
              <View style={styles.footerLinks}>
                <TouchableOpacity style={styles.footerLink}>
                  <MaterialIcons
                    name="contact-support"
                    size={14}
                    color={colors.primary}
                  />
                  <Text style={styles.contactText}>Contact Support</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.privacyText}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.copyright}>
                © 2024 Workforce Hub Operations. All Rights Reserved.
              </Text>
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
    backgroundColor: colors.surface,
  },
  keyboardView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 440,
    gap: 32,
  },
  brandSection: {
    alignItems: "center",
    gap: 12,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  titleContainer: {
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 30,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: "500",
    color: colors["on-surface-variant"],
  },
  loginCard: {
    backgroundColor: colors["surface-container-lowest"],
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
  },
  formContainer: {
    padding: 32,
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 14,
    fontWeight: "600",
    color: colors["on-surface"],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors["surface-container-high"],
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
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors["on-surface"],
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontFamily: fonts.label,
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  visibilityToggle: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  buttonContainer: {
    gap: 16,
    paddingTop: 8,
  },
  loginButton: {
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontFamily: fonts.headline,
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors["outline-variant"],
    opacity: 0.3,
  },
  dividerText: {
    fontFamily: fonts.label,
    fontSize: 11,
    fontWeight: "700",
    color: colors.outline,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginHorizontal: 16,
  },
  ssoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    height: 48,
    backgroundColor: colors["surface-container-low"],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors["outline-variant"],
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  ssoButtonText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: "600",
    color: colors["on-surface"],
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
    backgroundColor: colors["surface-container-lowest"],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  demoButtonText: {
    fontFamily: fonts.body,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  footer: {
    alignItems: "center",
    gap: 24,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  footerLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  privacyText: {
    fontFamily: fonts.body,
    fontSize: 14,
    fontWeight: "600",
    color: colors["on-surface-variant"],
  },
  copyright: {
    fontFamily: fonts.label,
    fontSize: 11,
    fontWeight: "700",
    color: colors.outline,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
});
