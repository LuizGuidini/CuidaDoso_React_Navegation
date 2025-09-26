import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: { backgroundColor: '#f1f4f8', paddingBottom: 10 },
  
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#a3d5ff',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  
  searchButtonText: { color: '#007AFF', fontWeight: 'bold' },
  
  linkButton: {
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#ffe0a3',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  
  linkButtonText: { color: '#374151', fontWeight: 'bold' },
  
  list: { paddingHorizontal: 15, paddingBottom: 30 },
  
  card: {
    backgroundColor: '#d8e6eeff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  image: { width: 80, height: 80, borderRadius: 8 },
  
  title: { marginLeft: 15, fontSize: 16, fontWeight: '600', flex: 1 },
  
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666',
  },
  
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  
  filterButton: {
    backgroundColor: '#a3d5ff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  
  filterText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },

});
