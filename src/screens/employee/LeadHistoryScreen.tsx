import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import {
  BottomSpacer,
  HeaderIconButton,
  FilterPill,
  StatusBadge,
} from "../../components/ui";

interface LeadData {
  id: string;
  name: string;
  status: "New Lead" | "Follow Up" | "Qualified" | "Converted";
  time: string;
  avatarColor: string;
}

const leads: LeadData[] = [
  { id: "1", name: "Rahul Sharma", status: "New Lead", time: "2 hours ago", avatarColor: "#7c3aed" },
  { id: "2", name: "Priya Patel", status: "Follow Up", time: "5 hours ago", avatarColor: "#2563eb" },
  { id: "3", name: "Amit Kumar", status: "Qualified", time: "1 day ago", avatarColor: "#059669" },
  { id: "4", name: "Neha Singh", status: "New Lead", time: "1 day ago", avatarColor: "#7c3aed" },
  { id: "5", name: "Vikram Singh", status: "Follow Up", time: "2 days ago", avatarColor: "#2563eb" },
  { id: "6", name: "Ananya Gupta", status: "Qualified", time: "2 days ago", avatarColor: "#059669" },
  { id: "7", name: "Rohit Mehra", status: "Converted", time: "3 days ago", avatarColor: "#0891b2" },
  { id: "8", name: "Kavita Nair", status: "New Lead", time: "3 days ago", avatarColor: "#7c3aed" },
  { id: "9", name: "Sanjay Roy", status: "Follow Up", time: "4 days ago", avatarColor: "#2563eb" },
  { id: "10", name: "Meera Devi", status: "Qualified", time: "5 days ago", avatarColor: "#059669" },
];

type FilterType = "All" | "New Lead" | "Follow Up" | "Qualified" | "Converted";

const filters: FilterType[] = ["All", "New Lead", "Follow Up", "Qualified", "Converted"];

export default function LeadHistoryScreen() {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");

  const filteredLeads = selectedFilter === "All"
    ? leads
    : leads.filter((lead) => lead.status === selectedFilter);

  const renderLeadItem = ({ item }: { item: LeadData }) => (
    <TouchableOpacity
      style={[styles.leadCard, { backgroundColor: colors.surfaceContainerLowest }]}
    >
      <View style={[styles.leadAvatar, { backgroundColor: item.avatarColor + "20" }]}>
        <Text style={[styles.leadAvatarText, { color: item.avatarColor }]}>
          {item.name.split(" ").map((n) => n[0]).join("")}
        </Text>
      </View>
      <View style={styles.leadContent}>
        <Text style={[styles.leadName, { color: colors.onSurface }]}>{item.name}</Text>
        <Text style={[styles.leadTime, { color: colors.onSurfaceVariant }]}>{item.time}</Text>
      </View>
      <StatusBadge status={item.status} />
      <MaterialCommunityIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <HeaderIconButton iconName="magnify" />
          <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Lead History</Text>
          <HeaderIconButton iconName="filter-variant" />
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
            />
          ))}
        </ScrollView>

        {/* Leads List */}
        <FlatList
          data={filteredLeads}
          keyExtractor={(item) => item.id}
          renderItem={renderLeadItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<BottomSpacer />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>
                No leads found
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  leadCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  leadAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  leadAvatarText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "700",
  },
  leadContent: {
    flex: 1,
    gap: 2,
  },
  leadName: {
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "600",
  },
  leadTime: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 48,
  },
  emptyText: {
    fontFamily: "Inter",
    fontSize: 14,
  },
});
