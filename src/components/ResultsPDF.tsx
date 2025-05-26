import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GradeResult, DeficitCheck } from '../types';

interface ResultsPDFProps {
  results: GradeResult[];
  average: number;
  deficitCheck: DeficitCheck;
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
  deficitRow: {
    backgroundColor: '#fee2e2',
  },
  subject: {
    fontSize: 12,
    color: '#333',
  },
  grade: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  averageContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  deficitContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 4,
    backgroundColor: props => {
      switch (props.status) {
        case 'success': return '#f0fdf4';
        case 'warning': return '#fefce8';
        case 'error': return '#fef2f2';
        default: return '#f0fdf4';
      }
    },
  },
  deficitMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
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

const ResultsPDF: React.FC<ResultsPDFProps> = ({ results, average, deficitCheck }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Notenrechner Ergebnisse</Text>

      <View style={[styles.deficitContainer, { status: deficitCheck.status }]}>
        <Text style={styles.deficitMessage}>{deficitCheck.message}</Text>
        {deficitCheck.deficitCount > 0 && (
          <Text style={styles.deficitMessage}>
            Anzahl der Defizite: {deficitCheck.deficitCount}
          </Text>
        )}
      </View>
      
      <Text style={styles.subtitle}>Einzelne Noten:</Text>
      {results.map((result, index) => (
        <View key={index} style={[styles.resultRow, result.isDeficit && styles.deficitRow]}>
          <Text style={styles.subject}>{result.subjectName || 'Unbenanntes Fach'}</Text>
          <Text style={styles.grade}>
            {result.grade.toFixed(1)} ({result.weight})
          </Text>
        </View>
      ))}
      
      <View style={styles.averageContainer}>
        <Text style={styles.averageLabel}>Gewichteter Durchschnitt:</Text>
        <Text style={styles.averageValue}>{average.toFixed(2)}</Text>
      </View>
      
      <Text style={styles.footer}>
        Generiert am {new Date().toLocaleDateString('de-DE')} mit Notenrechner
      </Text>
    </Page>
  </Document>
);

export default ResultsPDF;