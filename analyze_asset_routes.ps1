# Load the JSON data
$jsonData = Get-Content -Path "asset\routes_with_stops.json" -Raw | ConvertFrom-Json

# Basic statistics
$totalRoutes = $jsonData.Count
$routesWithStops = ($jsonData | Where-Object { $_.stops.Count -gt 0 }).Count
$totalStops = ($jsonData | ForEach-Object { $_.stops.Count } | Measure-Object -Sum).Sum
$uniqueStops = $jsonData | ForEach-Object { $_.stops } | Select-Object -ExpandProperty id -Unique | Measure-Object | Select-Object -ExpandProperty Count

# Group routes by type (based on prefix)
$routeTypes = $jsonData | Group-Object { 
    if ($_.shortName -match '^[A-Za-z]+') { 
        $matches[0] 
    } else { 
        'Other' 
    }
} | Sort-Object Count -Descending

# Get routes with most stops
$routesByStopCount = $jsonData | Sort-Object { $_.stops.Count } -Descending | Select-Object -First 5

# Output the analysis
Write-Host "=== Route Data Analysis ===" -ForegroundColor Green
Write-Host "Total routes: $totalRoutes"
Write-Host "Routes with stops: $routesWithStops"
Write-Host "Total stops (including duplicates): $totalStops"
Write-Host "Unique stops: $uniqueStops"

Write-Host "`n=== Route Types ===" -ForegroundColor Green
$routeTypes | Format-Table @{Name="Type"; Expression={$_.Name}}, 
                         @{Name="Count"; Expression={$_.Count}} -AutoSize

Write-Host "`n=== Routes with Most Stops ===" -ForegroundColor Green
$routesByStopCount | Format-Table @{Name="Route"; Expression={"$($_.shortName) - $($_.longName)"}}, 
                                 @{Name="Stop Count"; Expression={$_.stops.Count}} -AutoSize

# Find most common stops
$allStops = $jsonData | ForEach-Object { $_.stops } | Group-Object { $_.name }
$commonStops = $allStops | Sort-Object Count -Descending | Select-Object -First 5

Write-Host "`n=== Most Common Stops ===" -ForegroundColor Green
$commonStops | Format-Table @{Name="Stop Name"; Expression={$_.Name}}, 
                           @{Name="Appears in Routes"; Expression={$_.Count}} -AutoSize
