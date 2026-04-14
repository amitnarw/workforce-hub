import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { FilterPill } from "../../components/ui";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = "Approved" | "Pending" | "Rejected";
type FilterType = "All" | "Pending" | "Approved" | "Rejected";

interface Lead {
  id: string;
  name: string;
  phone: string;
  date: string;
  product: string;
  status: LeadStatus;
  estAmount?: string;
  rejectionRemark?: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    date: "13 Apr 2026",
    product: "Insurance",
    status: "Approved",
    estAmount: "₹50,000",
  },
  {
    id: "2",
    name: "Pooja Singh",
    phone: "+91 9988776655",
    date: "12 Apr 2026",
    product: "Credit Card",
    status: "Pending",
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 9123456780",
    date: "09 Apr 2026",
    product: "MSME Loan",
    status: "Rejected",
    estAmount: "₹2,00,000",
    rejectionRemark: "CIBIL score is too low (-1)",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    phone: "+91 8877665544",
    date: "04 Apr 2026",
    product: "Insurance",
    status: "Approved",
  },
];

const FILTERS: FilterType[] = ["All", "Pending", "Approved", "Rejected"];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LeadHistoryScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Filter leads based on active pill and search text
  const filteredLeads = MOCK_LEADS.filter((lead) => {
    const matchesFilter =
      activeFilter === "All" || lead.status === activeFilter;
    const lowerSearch = searchText.toLowerCase();
    const matchesSearch =
      !searchText ||
      lead.name.toLowerCase().includes(lowerSearch) ||
      lead.phone.includes(searchText) ||
      lead.product.toLowerCase().includes(lowerSearch);
    return matchesFilter && matchesSearch;
  });

  // ─── Badge helper ──────────────────────────────────────────────────────────

  const getBadgeStyles = (status: LeadStatus) => {
    switch (status) {
      case "Approved":
        return {
          bg: colors.tertiaryContainer,
          border: colors.tertiary,
          text: colors.onTertiary,
        };
      case "Pending":
        return {
          bg: colors.warningContainer,
          border: colors.warning,
          text: colors.onWarningContainer,
        };
      case "Rejected":
        return {
          bg: colors.errorContainer,
          border: colors.error,
          text: colors.onErrorContainer,
        };
    }
  };

  // ─── Single lead card ──────────────────────────────────────────────────────

  const renderLeadCard = (lead: Lead) => {
    const badge = getBadgeStyles(lead.status);

    return (
      <View
        key={lead.id}
        style={[
          styles.card,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        {/* Row 1: Name + Status Badge */}
        <View style={styles.cardRow1}>
          <Text style={[styles.leadName, { color: colors.onSurface }]}>
            {lead.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: badge.bg, borderColor: badge.border },
            ]}
          >
            <Text style={[styles.statusBadgeText, { color: badge.text }]}>
              {lead.status}
            </Text>
          </View>
        </View>

        {/* Row 2: Phone + Date */}
        <View style={styles.cardRow2}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="cellphone"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
              {lead.phone}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
              {lead.date}
            </Text>
          </View>
        </View>

        {/* Row 3: Product Tag + Est. Amount */}
        <View style={styles.cardRow3}>
          <View
            style={[
              styles.productTag,
              { backgroundColor: colors.surfaceContainerHigh },
            ]}
          >
            <Text style={[styles.productTagText, { color: colors.onSurface }]}>
              {lead.product}
            </Text>
          </View>
          {lead.estAmount ? (
            <Text style={[styles.estAmount, { color: colors.tertiary }]}>
              Est: {lead.estAmount}
            </Text>
          ) : null}
        </View>

        {/* Optional Row 4: Rejection Remark — only for Rejected leads */}
        {lead.status === "Rejected" && lead.rejectionRemark ? (
          <View
            style={[
              styles.rejectionBox,
              { backgroundColor: colors.errorContainer },
            ]}
          >
            <View style={styles.rejectionTitleRow}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={16}
                color={colors.error}
              />
              <Text
                style={[styles.rejectionTitle, { color: colors.error }]}
              >
                Rejection Remark
              </Text>
            </View>
            <Text style={[styles.rejectionText, { color: colors.error }]}>
              {lead.rejectionRemark}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            Lead History
          </Text>
        </View>

        {/* Search Bar Row */}
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={colors.onSurfaceVariant}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.onSurface }]}
              placeholder="Search by Name, Mobile, Produc..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.primary }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={22}
              color={colors.onPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Filter Pills Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsContainer}
          style={styles.filterPillsScroll}
        >
          {FILTERS.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>

        {/* Leads List */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLeads.map((lead) => renderLeadCard(lead))}

          {/* Empty state */}
          {filteredLeads.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="clipboard-text-off-outline"
                size={48}
                color={colors.onSurfaceVariant}
              />
              <Text
                style={[styles.emptyStateText, { color: colors.onSurfaceVariant }]}
              >
                No leads found
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // ── Header ──
  pageHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // ── Search Row ──
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    padding: 0,
    margin: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // ── Filter Pills ──
  filterPillsScroll: {
    marginBottom: 16,
  },
  filterPillsContainer: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  // ── List ──
  listScroll: {
    flex: 1,
    minHeight: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  // ── Lead Card ──
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leadName: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statusBadgeText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  cardRow2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "400",
  },
  cardRow3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productTagText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  estAmount: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Rejection Remark ──
  rejectionBox: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  rejectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rejectionTitle: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600",
  },
  rejectionText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 4,
    marginLeft: 22,
  },

  // ── Empty State ──
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "400",
  },

  // ── Bottom Spacer ──
  bottomSpacer: {
    height: 20,
  },
});