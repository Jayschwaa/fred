import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingValue}>Off</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Text Size</Text>
            <Text style={styles.settingValue}>Normal</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingValue}>On</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Job Alerts</Text>
            <Text style={styles.settingValue}>On</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Lead Updates</Text>
            <Text style={styles.settingValue}>On</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Company Info</Text>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Company</Text>
            <Text style={styles.infoValue}>5 Star Partners HVAC</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>License</Text>
            <Text style={styles.infoValue}>HVAC-12345</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Service Area</Text>
            <Text style={styles.infoValue}>Austin, TX</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Integrations</Text>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Square Payment</Text>
            <Text style={styles.settingValue}>Connected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Google Maps</Text>
            <Text style={styles.settingValue}>Connected</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Account</Text>
        <Card>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Text style={styles.settingValue}>•••••••</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Two-Factor Auth</Text>
            <Text style={styles.settingValue}>Off</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingVertical: 12,
  },
  header: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6B7280',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 13,
    color: '#0A1628',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  footer: {
    height: 10,
  },
});
