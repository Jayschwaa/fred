import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { LeadCard } from '@/components/LeadCard';
import { Button } from '@/components/ui/Button';
import { leadStore } from '@/store/leadStore';
import { Lead, LeadStatus } from '@/types';

export default function LeadsScreen() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadLeads();
    }, [])
  );

  const loadLeads = () => {
    setLoading(true);
    try {
      const allLeads = leadStore.getAll();
      setLeads(allLeads);
      applyFilters(allLeads, filter, searchText);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (leadList: Lead[], filterStatus: string, search: string) => {
    let filtered = leadList;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((lead) => lead.status === filterStatus);
    }

    if (search.trim()) {
      filtered = leadStore.search(search);
    }

    setFilteredLeads(filtered);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilters(leads, newFilter, searchText);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    applyFilters(leads, filter, text);
  };

  const handleLeadPress = (leadId: string) => {
    router.push({
      pathname: '/lead/[id]',
      params: { id: leadId },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C5962A" />
        </View>
      </SafeAreaView>
    );
  }

  const filters: Array<{ label: string; value: string }> = [
    { label: 'All', value: 'all' },
    { label: 'New', value: LeadStatus.NEW },
    { label: 'Contacted', value: LeadStatus.CONTACTED },
    { label: 'Qualified', value: LeadStatus.QUALIFIED },
    { label: 'Booked', value: LeadStatus.BOOKED },
    { label: 'Lost', value: LeadStatus.LOST },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleSearch}
        />

        <View style={styles.filterScroll}>
          {filters.map((filterOption) => (
            <TouchableOpacity
              key={filterOption.value}
              style={[
                styles.filterButton,
                filter === filterOption.value && styles.filterButtonActive,
              ]}
              onPress={() => handleFilterChange(filterOption.value)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === filterOption.value && styles.filterTextActive,
                ]}
              >
                {filterOption.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {filteredLeads.length > 0 ? (
        <FlatList
          data={filteredLeads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleLeadPress(item.id)} activeOpacity={0.8}>
              <LeadCard lead={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyText}>No leads found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
        </View>
      )}

      <View style={styles.bottomInfo}>
        <Text style={styles.infoText}>
          Showing {filteredLeads.length} of {leads.length} leads
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    backgroundColor: 'white',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
    color: '#0A1628',
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 0,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: '#0A1628',
    borderColor: '#0A1628',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#C5962A',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  bottomInfo: {
    backgroundColor: 'white',
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
