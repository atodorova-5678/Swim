# 🌊 Swim or Skip?

One button. One honest answer about the water at the Santa Cruz Wharf.

Live swim conditions for the wharf / Cowell Beach: water temperature, swell, wind,
tide, sun — and a verdict, from **SEND IT 🏊** to **WATCH FROM THE WHARF**.

**Try it:** https://atodorova-5678.github.io/Swim/

## How it works

A single HTML file. Vanilla JS, no backend, no build, no API keys.

Data, fetched live on each check:

- [Open-Meteo Marine API](https://open-meteo.com/) — wave height / period / direction, sea surface temperature
- [Open-Meteo Forecast API](https://open-meteo.com/) — air temp, wind, UV, sunrise/sunset
- [NOAA CO-OPS](https://tidesandcurrents.noaa.gov/) station 9413745 (Santa Cruz, Monterey Bay) — tide predictions

Wave height is a mid-bay model value; sheltered Cowell usually sees less (the app says so).

Not a lifeguard. Your eyes outrank this page.

## Sibling app

[Bay Area Trail & Beer Finder](https://atodorova-5678.github.io/Hiking/) — same philosophy, more beer.
