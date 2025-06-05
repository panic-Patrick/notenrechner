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
  tableContainer: {
    marginTop: 40,
    borderTop: 1,
    borderColor: '#ccc',
    paddingTop: 20,
  },
  tableTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'center',
  },
});

const gradePointTable = [
  { points: '15', grade: '1,0' },
  { points: '14', grade: '1,3' },
  { points: '13', grade: '1,7' },
  { points: '12', grade: '2,0' },
  { points: '11', grade: '2,3' },
  { points: '10', grade: '2,7' },
  { points: '9', grade: '3,0' },
  { points: '8', grade: '3,3' },
  { points: '7', grade: '3,7' },
  { points: '6', grade: '4,0' },
  { points: '5', grade: '4,3' },
  { points: '4', grade: '4,7' },
  { points: '3', grade: '5,0' },
  { points: '2', grade: '5,3' },
  { points: '1', grade: '5,7' },
  { points: '0', grade: '6,0' },
];

const ResultsPDF: React.FC<ResultsPDFProps> = ({ results, average }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Punkterechner VL2 Ergebnisse</Text>
      
      <Text style={styles.subtitle}>Einzelne Punkte:</Text>
      {results.map((result, index) => (
        <View key={index} style={styles.resultRow}>
          <Text style={styles.subject}>{result.subjectName || 'Unbenanntes Fach'}</Text>
          <Text style={styles.points}>
            {result.grade.toFixed(1)} Punkte ({result.weight})
          </Text>
        </View>
      ))}
      
      <View style={styles.averageContainer}>
        <Text style={styles.averageLabel}>Gewichteter Punktedurchschnitt:</Text>
        <Text style={styles.averageValue}>{average.toFixed(2)} Punkte</Text>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Punkte-Noten-Umrechnungstabelle:</Text>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Punkte</Text>
          <Text style={styles.tableCell}>Note</Text>
        </View>
        {gradePointTable.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.points}</Text>
            <Text style={styles.tableCell}>{row.grade}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.footer}>
        Generiert am {new Date().toLocaleDateString('de-DE')} mit Punkterechner VL2
      </Text>
    </Page>
  </Document>
);

export default ResultsPDF;