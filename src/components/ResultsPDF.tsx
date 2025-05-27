import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GradeResult } from '../types';

interface ResultsPDFProps {
  results: GradeResult[];
  average: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1976d2',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  subject: {
    fontSize: 12,
    color: '#333',
  },
  points: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  averageContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  averageLabel: {
    fontSize: 16,
    color: '#1976d2',
  },
  averageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
  },
});

const ResultsPDF: React.FC<ResultsPDFProps> = ({ results, average }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Punkterechner VL2 Ergebnisse</Text>
      
      <Text style={styles.subtitle}>Einzelne Punkte:</Text>
      {results.map((result, index) => (
        <View key={index} style={styles.resultRow}>
          <Text style={styles.subject}>{result.subjectName || 'Unbenanntes Fach'}</Text>
          <Text style={styles.points}>
            {result.grade.toFixed(1)} ({result.weight})
          </Text>
        </View>
      ))}
      
      <View style={styles.averageContainer}>
        <Text style={styles.averageLabel}>Gewichteter Durchschnitt:</Text>
        <Text style={styles.averageValue}>{average.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.footer}>
        Generiert am {new Date().toLocaleDateString('de-DE')} mit Punkterechner
      </Text>
    </Page>
  </Document>
);

export default ResultsPDF;