# PBTS Data Extraction Summary

**Extraction Date:** 2025-11-28T09:32:28.340Z

## Statistics

- **Routes:** 194
  - ANBESSA: 122
  - SHEGER: 72

- **Stops:** 1350
  - With GPS: 1350

- **Route-Stop Relationships:** 0
  - Average stops per route: 0

## Files Generated

1. **01_routes.json** - 194 routes
2. **02_stops.json** - 1350 stops  
3. **03_route_stops.json** - 0 relationships

## MongoDB Import Commands

```bash
mongoimport --db pbts_system --collection routes --file 01_routes.json --jsonArray
mongoimport --db pbts_system --collection stops --file 02_stops.json --jsonArray
mongoimport --db pbts_system --collection route_stops --file 03_route_stops.json --jsonArray
```
