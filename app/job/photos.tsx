import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function PhotosScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);

  const photoPrompts = [
    'Equipment nameplate/serial number',
    'Before photos of system',
    'Condenser coil condition',
    'Blower motor area',
    'Electrical connections',
    'Refrigerant lines',
    'Any visible issues or damage',
    'Work area setup',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>Photo Documentation</Text>
          <Text style={styles.subtitle}>
            Capture photos for equipment condition documentation
          </Text>
        </Card>

        {photoPrompts.map((prompt, index) => (
          <Card key={index} style={styles.promptCard}>
            <View style={styles.promptHeader}>
              <Text style={styles.promptNumber}>{index + 1}</Text>
              <Text style={styles.promptText}>{prompt}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.cameraText}>Take Photo</Text>
            </TouchableOpacity>
          </Card>
        ))}

        <Card>
          <Text style={styles.statsText}>
            Photos captured: {photos.length} of {photoPrompts.length}
          </Text>
        </Card>

        <Card>
          <Button
            label="Generate AI Summary"
            onPress={() => {
              console.log('Generating photo summary with AI...');
            }}
            size="large"
            style={styles.actionButton}
          />
          <Button
            label="Back to Job"
            onPress={() => router.back()}
            variant="secondary"
            size="large"
          />
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  promptCard: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  promptHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  promptNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C5962A',
    marginRight: 8,
  },
  promptText: {
    fontSize: 13,
    color: '#0A1628',
    flex: 1,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  cameraIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cameraText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  statsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
