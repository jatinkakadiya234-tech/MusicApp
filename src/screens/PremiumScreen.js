import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { demoData } from '../data/demoData';
import { colors, typography, spacing, borderRadius } from '../theme/theme';

export const PremiumScreen = () => {
  const insets = useSafeAreaInsets();
  const [selectedPlanId, setSelectedPlanId] = useState('plan_individual');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + spacing.xs, spacing.lg) }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Premium Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroIconBadge}>
          <Ionicons name="sparkles" size={28} color="#FFD700" />
        </View>
        <Text style={styles.heroTitle}>Unlock Premium Audio</Text>
        <Text style={styles.heroSubtitle}>
          Enjoy ad-free music, offline listening, and Hi-Fi Lossless Sound.
        </Text>
      </View>

      {/* Plan Selector List */}
      <Text style={styles.sectionHeader}>Choose Your Plan</Text>

      {demoData.premiumPlans.map(plan => {
        const isSelected = selectedPlanId === plan.id;
        return (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              isSelected && { borderColor: plan.color, backgroundColor: colors.surfaceElevated },
            ]}
            onPress={() => setSelectedPlanId(plan.id)}
            activeOpacity={0.9}
          >
            {plan.badge && (
              <View style={[styles.badge, { backgroundColor: plan.color }]}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}

            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>
                  <Text style={styles.priceAmount}>{plan.price}</Text> / {plan.period}
                </Text>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  isSelected && { borderColor: plan.color },
                ]}
              >
                {isSelected && (
                  <View style={[styles.radioInner, { backgroundColor: plan.color }]} />
                )}
              </View>
            </View>

            {/* Features Checklist */}
            <View style={styles.featureList}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <Ionicons name="checkmark-circle" size={18} color={plan.color} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.subscribeButton,
                { backgroundColor: isSelected ? plan.color : colors.surface },
              ]}
            >
              <Text style={styles.subscribeButtonText}>
                {isSelected ? 'Subscribe Now' : 'Select Plan'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.disclaimerText}>
        Terms and conditions apply. Subscriptions auto-renew monthly unless cancelled at least 24 hours before renewal.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  heroBanner: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    borderColor: colors.border,
    borderWidth: 1,
  },
  heroIconBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionHeader: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -12,
    right: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  planName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  planPrice: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceAmount: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  featureList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  subscribeButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  disclaimerText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: spacing.sm,
  },
});

export default PremiumScreen;
