import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f4f8' 
  },
  searchContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    alignItems: 'center' 
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationButton: {
    marginLeft: 10,
    backgroundColor: '#00C851',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
  },
  categorySelected: { borderWidth: 2, borderColor: '#007AFF' },
  categoryText: { marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#007AFF' },
  placesContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0ff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
  },
  placeText: { fontSize: 18, fontWeight: '600', color: '#007AFF' },
  placeAddress: { fontSize: 14, color: '#555', marginTop: 4, marginLeft: 12 }
});
