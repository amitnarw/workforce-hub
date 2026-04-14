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
import { BottomSpacer, FilterPill } from "../../components/ui";

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
  {
    id: "5",
    name: "Vijay Reddy",
    phone: "+91 8765432109",
    date: "02 Apr 2026",
    product: "Home Loan",
    status: "Approved",
    estAmount: "₹1,50,000",
  },
  {
    id: "6",
    name: "Anita Sharma",
    phone: "+91 7654321098",
    date: "01 Apr 2026",
    product: "Credit Card",
    status: "Pending",
  },
  {
    id: "7",
    name: "Rajesh Kumar",
    phone: "+91 6543210987",
    date: "28 Mar 2026",
    product: "Insurance",
    status: "Rejected",
    rejectionRemark: "Invalid documents submitted",
  },
  {
    id: "8",
    name: "Priya Verma",
    phone: "+91 5432109876",
    date: "25 Mar 2026",
    product: "MSME Loan",
    status: "Approved",
    estAmount: "₹75,000",
  },
  {
    id: "9",
    name: "Arun Joshi",
    phone: "+91 4321098765",
    date: "22 Mar 2026",
    product: "Insurance",
    status: "Pending",
  },
  {
    id: "10",
    name: "Meera Patel",
    phone: "+91 3210987654",
    date: "20 Mar 2026",
    product: "Home Loan",
    status: "Rejected",
    rejectionRemark: "Income not meeting criteria",
  },
  {
    id: "11",
    name: "Suresh Raina",
    phone: "+91 2109876543",
    date: "18 Mar 2026",
    product: "Credit Card",
    status: "Approved",
    estAmount: "₹35,000",
  },
  {
    id: "12",
    name: "Kavita Nair",
    phone: "+91 1098765432",
    date: "15 Mar 2026",
    product: "Insurance",
    status: "Pending",
  },
  {
    id: "13",
    name: "Vikram Singh",
    phone: "+91 0987654321",
    date: "12 Mar 2026",
    product: "MSME Loan",
    status: "Approved",
    estAmount: "₹1,20,000",
  },
  {
    id: "14",
    name: "Nisha Gupta",
    phone: "+91 9876543211",
    date: "10 Mar 2026",
    product: "Credit Card",
    status: "Rejected",
    rejectionRemark: "Existing loan conflict",
  },
  {
    id: "15",
    name: "Rahul Verma",
    phone: "+91 8765432198",
    date: "08 Mar 2026",
    product: "Insurance",
    status: "Approved",
    estAmount: "₹80,000",
  },
  {
    id: "16",
    name: "Sunita Rao",
    phone: "+91 7654321090",
    date: "05 Mar 2026",
    product: "Home Loan",
    status: "Pending",
  },
  {
    id: "17",
    name: "Ajay Kumar",
    phone: "+91 6543210981",
    date: "01 Mar 2026",
    product: "MSME Loan",
    status: "Approved",
    estAmount: "₹2,50,000",
  },
  {
    id: "18",
    name: "Preeti Sharma",
    phone: "+91 5432109872",
    date: "26 Feb 2026",
    product: "Credit Card",
    status: "Rejected",
    rejectionRemark: "Age criteria not met",
  },
  {
    id: "19",
    name: "Deepak Singh",
    phone: "+91 4321098760",
    date: "22 Feb 2026",
    product: "Insurance",
    status: "Approved",
  },
  {
    id: "20",
    name: "Anjali Menon",
    phone: "+91 3210987651",
    date: "18 Feb 2026",
    product: "Home Loan",
    status: "Pending",
    estAmount: "₹3,00,000",
  },
];

const FILTERS: FilterType[] = ["All", "Pending", "Approved", "Rejected"];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LeadsScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

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
          text: colors.onTertiary,
        };
      case "Pending":
        return {
          bg: colors.warningContainer,
          text: colors.onWarningContainer,
        };
      case "Rejected":
        return {
          bg: colors.errorContainer,
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
          { backgroundColor: colors.surfaceContainerLowest },
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
              { backgroundColor: badge.bg },
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

        {/* Rejection Remark — only for Rejected leads */}
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
      style={[styles.safeArea, { backgroundColor: "#fff" }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>

        {/* Page Header */}
        <View style={{ backgroundColor: "#fff" }}>
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
              <TouchableOpacity onPress={() => { }}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={22}
                  color={colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.filterButton, { backgroundColor: colors.primary }]}
              onPress={() => { }}
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
          <View style={styles.filterPillsRow}>
            {FILTERS.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onPress={() => handleFilterChange(filter)}
              />
            ))}
          </View>
        </View>

        {/* Leads List with Fade Animation */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
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

          <BottomSpacer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },

  // ── Header ──
  pageHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // ── Search Row ──
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    marginBottom: 4,
  },
  filterPillsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
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
    paddingTop: 10
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 0,
  },

  // ── Lead Card ──
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  cardRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
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
    marginBottom: 6,
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
    marginTop: 6,
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