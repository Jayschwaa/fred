import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/Button';
import { jobStore } from '@/store/jobStore';
import { Job, JobStatus } from '@/types';

export default function JobsScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadJobs();
    }, [])
  );

  const loadJobs = () => {
    setLoading(true);
    try {
      const allJobs = jobStore.getAll();
      setJobs(allJobs);
      applyFilters(allJobs, filter, searchText);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (jobList: Job[], filterStatus: string, search: string) => {
    let filtered = jobList;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((job) => job.status === filterStatus);
    }

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobType.toLowerCase().includes(lower) ||
          job.address.toLowerCase().includes(lower) ||
          job.description.toLowerCase().includes(lower)
      );
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilters(jobs, newFilter, searchText);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    applyFilters(jobs, filter, text);
  };

  const handleJobPress = (jobId: string) => {
    router.push({
      pathname: '/job/[id]',
      params: { id: jobId },
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
    { label: 'New', value: JobStatus.NEW },
    { label: 'Booked', value: JobStatus.BOOKED },
    { label: 'Dispatched', value: JobStatus.DISPATCHED },
    { label: 'In Progress', value: JobStatus.IN_PROGRESS },
    { label: 'Completed', value: JobStatus.COMPLETED },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={handleSearch}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
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
        </ScrollView>
      </View>

      {filteredJobs.length > 0 ? (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleJobPress(item.id)} activeOpacity={0.8}>
              <JobCard job={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No jobs found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
        </View>
      )}

      <View style={styles.bottomInfo}>
        <Text style={styles.infoText}>
          Showing {filteredJobs.length} of {jobs.length} jobs
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
    marginHorizontal: -4,
  },
  filterContent: {
    paddingHorizontal: 4,
    gap: 8,
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
