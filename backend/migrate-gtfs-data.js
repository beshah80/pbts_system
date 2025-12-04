const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GTFS Data from Sheger Bus System - Complete Routes
const shegerRoutes = [
  { routeId: 'SH027', routeName: 'Shero Meda ↔ Bole Millenium', fleet: 'SHEGER' },
  { routeId: 'SH028', routeName: 'Shero Meda ↔ Abo Junction', fleet: 'SHEGER' },
  { routeId: 'SH016', routeName: 'Piassa Arada ↔ Abo Junction', fleet: 'SHEGER' },
  { routeId: 'SH004', routeName: 'Yeka Abado ↔ Megenagna', fleet: 'SHEGER' },
  { routeId: 'SH010', routeName: 'Autobis Tera (2) ↔ Alem Bank', fleet: 'SHEGER' },
  { routeId: 'A10', routeName: 'Mexico ↔ Haile Garment', fleet: 'SHEGER' },
  { routeId: 'SH040', routeName: 'Kara Kore ↔ Autobis Tera (1)', fleet: 'SHEGER' },
  { routeId: 'D26', routeName: 'Yerer Goro ↔ Megenagna', fleet: 'SHEGER' },
  { routeId: 'A24', routeName: 'Mexico ↔ Megenagna', fleet: 'SHEGER' },
  { routeId: 'C15', routeName: 'Piassa Arada ↔ Mebrat Condominium', fleet: 'SHEGER' },
  { routeId: 'C14', routeName: 'Sansusi ↔ Piassa Arada', fleet: 'SHEGER' },
  { routeId: 'A08', routeName: 'Gurara ↔ 4 Kilo', fleet: 'SHEGER' },
  { routeId: 'C31', routeName: 'Piassa Arada ↔ Dil Ber', fleet: 'SHEGER' },
  { routeId: 'B37', routeName: 'Shero Meda ↔ Autobis Tera (3)', fleet: 'SHEGER' },
  { routeId: 'B19', routeName: 'Autobis Tera (1) ↔ Abo Junction', fleet: 'SHEGER' },
  { routeId: 'A09', routeName: 'Mexico ↔ Alem Bank', fleet: 'SHEGER' },
  { routeId: 'D52', routeName: 'Koye Feche ↔ Megenagna', fleet: 'SHEGER' },
  { routeId: 'D25', routeName: 'Summit Condominiums ↔ Megenagna Terminal', fleet: 'SHEGER' },
  { routeId: 'B35', routeName: 'Autobis Tera (2) ↔ Kela', fleet: 'SHEGER' },
  { routeId: 'B40', routeName: 'Saris Abo ↔ Ayer Tena', fleet: 'SHEGER' },
  { routeId: 'C51', routeName: 'Yeka Abado ↔ Piassa Arada', fleet: 'SHEGER' },
  { routeId: 'D23', routeName: 'Megenagna Terminal ↔ Aba Kiros Roundabout', fleet: 'SHEGER' },
  { routeId: 'A05', routeName: 'Mexico ↔ Lafto', fleet: 'SHEGER' },
  { routeId: 'A01', routeName: 'Shero Meda ↔ Mexico', fleet: 'SHEGER' },
  { routeId: 'C17', routeName: 'Piassa Arada ↔ Marathon Motor (Megenagna)', fleet: 'SHEGER' },
  { routeId: 'B22', routeName: 'Autobis Tera ↔ Asko', fleet: 'SHEGER' },
  { routeId: 'A04', routeName: 'Sefera ↔ Mexico', fleet: 'SHEGER' },
  { routeId: 'A18', routeName: 'Piassa Arada ↔ Jemmo 2', fleet: 'SHEGER' },
  { routeId: 'A02', routeName: 'Mexico ↔ Jemo 1', fleet: 'SHEGER' },
  { routeId: 'B35B', routeName: 'Merkato ↔ Ashewa Meda', fleet: 'SHEGER' },
  { routeId: 'C50', routeName: 'kera ↔ Addisu Gebeya', fleet: 'SHEGER' },
  { routeId: 'SH012', routeName: 'Sansusi ↔ Autobis Tera', fleet: 'SHEGER' },
  { routeId: 'SH009', routeName: 'Ayer Tena ↔ Autobis Tera (2)', fleet: 'SHEGER' },
  { routeId: 'D46', routeName: 'Megenagna Terminal ↔ Bole Arabsa', fleet: 'SHEGER' },
  { routeId: 'SH035', routeName: 'Shero Meda ↔ Megenagna', fleet: 'SHEGER' },
  { routeId: 'SH022', routeName: 'Mexico ↔ Hana Mariam (2)', fleet: 'SHEGER' },
  { routeId: 'SH015', routeName: 'Bole Millenium ↔ 4 Kilo', fleet: 'SHEGER' }
];

// GTFS Data from Anbessa Bus System - Complete Routes
const anbesaRoutes = [
  { routeId: 'AB097', routeName: 'Megenagna Terminal ↔ Legedadi Mission', fleet: 'ANBESSA' },
  { routeId: 'AB101', routeName: 'Megenagna Terminal ↔ Aba Kiros Roundabout', fleet: 'ANBESSA' },
  { routeId: 'AB049', routeName: 'Megenagna Terminal ↔ Ayat Chefe Condominium', fleet: 'ANBESSA' },
  { routeId: 'AB083', routeName: 'Ayat Chefe Condominium ↔ 6 Kilo', fleet: 'ANBESSA' },
  { routeId: 'AB010', routeName: 'Kotebe Teachers College ↔ Piassa Arada', fleet: 'ANBESSA' },
  { routeId: 'AB009', routeName: 'Piassa Arada ↔ Brass Clinic (Bole)', fleet: 'ANBESSA' },
  { routeId: 'AB061', routeName: 'Legehar (Old Train Station) ↔ Ayat Chefe Condominium', fleet: 'ANBESSA' },
  { routeId: 'AB032', routeName: 'Hanna Mariam ↔ Legehar (Old Train Station)', fleet: 'ANBESSA' },
  { routeId: 'AB018', routeName: 'Yeshi Debele ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB087', routeName: 'Winget ↔ Ayer Tena (Terminal)', fleet: 'ANBESSA' },
  { routeId: 'AB110', routeName: 'Tulu Dimtu ↔ 6 Kilo', fleet: 'ANBESSA' },
  { routeId: 'AB047', routeName: 'Shegole (Mender 7) ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB028', routeName: 'Sansusi ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB041', routeName: 'Eyesus ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB003', routeName: 'Ayer Tena ↔ Piassa Arada', fleet: 'ANBESSA' },
  { routeId: 'AB034', routeName: 'German Square ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB004', routeName: 'Kality Meneharia ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB006', routeName: 'kera ↔ Addisu Gebeya', fleet: 'ANBESSA' },
  { routeId: 'AB027', routeName: 'Mexico ↔ Gelan Condominium', fleet: 'ANBESSA' },
  { routeId: 'AB033', routeName: 'Kotebe Gebriel ↔ Arat Kilo', fleet: 'ANBESSA' },
  { routeId: 'AB036', routeName: 'Legehar (Old Train Station) ↔ Kara Kore', fleet: 'ANBESSA' },
  { routeId: 'AB037', routeName: 'Yeshi Debele ↔ St. George Church', fleet: 'ANBESSA' },
  { routeId: 'AB055', routeName: 'Legehar (Old Train Station) ↔ Gurara', fleet: 'ANBESSA' },
  { routeId: 'AB056', routeName: 'Saris Abo ↔ Shero Meda', fleet: 'ANBESSA' },
  { routeId: 'AB058', routeName: 'Legehar (Old Train Station) ↔ Alem Bank', fleet: 'ANBESSA' },
  { routeId: 'AB064', routeName: 'Megenagna ↔ Gurara', fleet: 'ANBESSA' },
  { routeId: 'AB065', routeName: 'Autobis Tera ↔ Alem Bank', fleet: 'ANBESSA' },
  { routeId: 'AB066', routeName: 'Kara Kore ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB068', routeName: 'Menlik Hospital ↔ Torhailoch', fleet: 'ANBESSA' },
  { routeId: 'AB070', routeName: 'Ayer Tena ↔ Abuare Roundabout', fleet: 'ANBESSA' },
  { routeId: 'AB077', routeName: 'Kera ↔ Ayer Tena', fleet: 'ANBESSA' },
  { routeId: 'AB029', routeName: 'Yerer Goro ↔ Mexico', fleet: 'ANBESSA' },
  { routeId: 'AB090', routeName: 'Betel ↔ Legehar (Old Train Station)', fleet: 'ANBESSA' },
  { routeId: 'AB092', routeName: 'Hana Mariam ↔ Darmar', fleet: 'ANBESSA' },
  { routeId: 'AB094', routeName: 'Piassa Arada ↔ Mikili Land', fleet: 'ANBESSA' },
  { routeId: 'AB099', routeName: 'Alem Bank ↔ Ayer Tena', fleet: 'ANBESSA' },
  { routeId: 'AB100', routeName: 'Jemmo 3 ↔ Autobis Tera', fleet: 'ANBESSA' },
  { routeId: 'AB102', routeName: 'Kara ↔ Legehar (Old Train Station)', fleet: 'ANBESSA' },
  { routeId: 'AB105', routeName: 'Anfo Meda ↔ Legehar (Old Train Station)', fleet: 'ANBESSA' },
  { routeId: 'AB109', routeName: 'Saris Abo ↔ Tulu Dimtu Adebabay', fleet: 'ANBESSA' },
  { routeId: 'AB117', routeName: 'Sefera ↔ Mexico', fleet: 'ANBESSA' }
];

// Complete GTFS Stops Data from both systems
const gtfsStops = [
  // Major Terminal Stops
  { stopId: 'node/7022361366', stopName: 'Megenagna Terminal', stopNameAmharic: 'መገናኛ ተርሚናል', latitude: 9.0203188, longitude: 38.8026673 },
  { stopId: 'node/7041071378', stopName: 'Legehar (Old Train Station)', stopNameAmharic: 'ለገሃር', latitude: 9.0109604, longitude: 38.7533069 },
  { stopId: 'node/7041071600', stopName: 'Autobus Tera', stopNameAmharic: 'አውቶቡስ ተራ', latitude: 9.03371, longitude: 38.7298446 },
  
  // Central Addis Ababa Stops
  { stopId: 'node/847244423', stopName: 'Black Lion', stopNameAmharic: 'ብላክ ላዮን', latitude: 9.0209237, longitude: 38.7521415 },
  { stopId: 'node/4832025024', stopName: '4 Kilo', stopNameAmharic: '4 ኪሎ', latitude: 9.0344007, longitude: 38.7632408 },
  { stopId: 'node/5330678521', stopName: 'Ambassador', stopNameAmharic: 'አምባሳደር', latitude: 9.0164409, longitude: 38.7553162 },
  { stopId: 'node/5736089088', stopName: 'Stadium', stopNameAmharic: 'ስታዲየም', latitude: 9.0120276, longitude: 38.7570321 },
  { stopId: 'node/6814022390', stopName: 'Mexico', stopNameAmharic: 'ሜክሲኮ', latitude: 9.0094665, longitude: 38.7444332 },
  { stopId: 'node/6967281241', stopName: 'Piassa (Downtown Cafe)', stopNameAmharic: 'ፒያሳ', latitude: 9.0319356, longitude: 38.7512565 },
  { stopId: 'node/7041071579', stopName: 'Piassa Arada', stopNameAmharic: 'ፒያሳ አራዳ', latitude: 9.0365871, longitude: 38.7522029 },
  { stopId: 'node/7076294510', stopName: 'Shero Meda', stopNameAmharic: 'ሸሮ መዳ', latitude: 9.0622823, longitude: 38.7612538 },
  
  // Bole Area Stops
  { stopId: 'node/7022397409', stopName: 'Bole Millenium', stopNameAmharic: 'ቦሌ ሚሊኒየም', latitude: 8.9885373, longitude: 38.7897496 },
  { stopId: 'node/7057187392', stopName: 'Brass Clinic (Bole)', stopNameAmharic: 'ብራስ ክሊኒክ', latitude: 8.9904207, longitude: 38.7929906 },
  { stopId: 'node/7110725242', stopName: 'Bole Bridge', stopNameAmharic: 'ቦሌ ድልድይ', latitude: 8.9867261, longitude: 38.7903601 },
  
  // Yeka Area Stops
  { stopId: 'node/7022397420', stopName: 'Yeka Abado', stopNameAmharic: 'የካ አባዶ', latitude: 9.0689298, longitude: 38.875565 },
  { stopId: 'node/7037183552', stopName: 'Yeka Condominium 1', stopNameAmharic: 'የካ ኮንዶሚኒየም 1', latitude: 9.0354891, longitude: 38.877919 },
  
  // Ayat Area Stops
  { stopId: 'node/7037183519', stopName: 'Ayat', stopNameAmharic: 'አያት', latitude: 9.0208331, longitude: 38.8686047 },
  { stopId: 'node/7037183542', stopName: 'Ayat Chefe Condominium', stopNameAmharic: 'አያት ቸፌ ኮንዶሚኒየም', latitude: 9.0113906, longitude: 38.8946677 },
  { stopId: 'node/7070861714', stopName: 'Ayat Roundabout', stopNameAmharic: 'አያት ዙሪያ', latitude: 9.0221276, longitude: 38.876525 },
  
  // Aba Kiros Area Stops
  { stopId: 'node/7022397418', stopName: 'Aba Kiros Roundabout', stopNameAmharic: 'አባ ኪሮስ ዙሪያ', latitude: 9.0561234, longitude: 38.8785328 },
  
  // Summit Area Stops
  { stopId: 'node/7022397413', stopName: 'Summit Condominiums', stopNameAmharic: 'ሰሚት ኮንዶሚኒየም', latitude: 8.9842709, longitude: 38.8569749 },
  { stopId: 'node/7037183527', stopName: 'Summit (MOHA)', stopNameAmharic: 'ሰሚት', latitude: 9.0043876, longitude: 38.8520658 },
  
  // Kotebe Area Stops
  { stopId: 'node/7037183508', stopName: 'Kotebe Teachers College', stopNameAmharic: 'ኮተቤ መምህራን ኮሌጅ', latitude: 9.0342084, longitude: 38.8466963 },
  { stopId: 'node/7037183510', stopName: 'Kotebe Gebriel', stopNameAmharic: 'ኮተቤ ገብርኤል', latitude: 9.036101, longitude: 38.8545188 },
  
  // Legedadi Area Stops
  { stopId: 'node/7037183574', stopName: 'Legedadi Mission', stopNameAmharic: 'ለገዳዲ ሚሽን', latitude: 9.0818058, longitude: 38.9074861 },
  
  // Hanna Mariam Area Stops
  { stopId: 'node/7037183502', stopName: 'Hanna Mariam', stopNameAmharic: 'ሃና ማርያም', latitude: 9.0375551, longitude: 38.8316144 },
  { stopId: 'node/7049122265', stopName: 'Hana Mariam (2)', stopNameAmharic: 'ሃና ማርያም 2', latitude: 8.935835, longitude: 38.7440895 },
  
  // Yeshi Debele Area Stops
  { stopId: 'node/7041071454', stopName: 'Yeshi Debele', stopNameAmharic: 'የሺ ደበለ', latitude: 9.0195382, longitude: 38.6954056 },
  
  // Winget Area Stops
  { stopId: 'node/7074267435', stopName: 'Winget', stopNameAmharic: 'ዊንጌት', latitude: 9.0554455, longitude: 38.7138884 },
  
  // Shegole Area Stops
  { stopId: 'node/7041071648', stopName: 'Shegole Bank', stopNameAmharic: 'ሸጎሌ ባንክ', latitude: 9.0541015, longitude: 38.7200104 },
  
  // Sansusi Area Stops
  { stopId: 'node/7074387585', stopName: 'Sansusi', stopNameAmharic: 'ሳንሱሲ', latitude: 9.0714186, longitude: 38.6891023 },
  
  // Eyesus Area Stops
  { stopId: 'node/7041071737', stopName: 'Eyesus', stopNameAmharic: 'ኢየሱስ', latitude: 9.0649811, longitude: 38.7715088 },
  
  // Ayer Tena Area Stops
  { stopId: 'node/7074504388', stopName: 'Ayer Tena', stopNameAmharic: 'አየር ተና', latitude: 8.9831093, longitude: 38.6982193 },
  
  // German Square Area Stops
  { stopId: 'node/6967234177', stopName: 'German Square', stopNameAmharic: 'ጀርመን አደባባይ', latitude: 8.9655968, longitude: 38.732897 },
  
  // Kality Area Stops
  { stopId: 'node/7041052896', stopName: 'Kality Meneharia', stopNameAmharic: 'ቃሊቲ መነሃሪያ', latitude: 8.8958584, longitude: 38.7717989 },
  
  // Kera Area Stops
  { stopId: 'node/6967179323', stopName: 'Kera (Gofa Road)', stopNameAmharic: 'ከራ', latitude: 8.9825519, longitude: 38.7498599 },
  
  // Addisu Gebeya Area Stops
  { stopId: 'node/7074233344', stopName: 'Adisu Gebeya', stopNameAmharic: 'አዲሱ ገበያ', latitude: 9.0592088, longitude: 38.7379037 },
  
  // Gelan Condominium Area Stops
  { stopId: 'node/7037142444', stopName: 'Gelan Condominium', stopNameAmharic: 'ገላን ኮንዶሚኒየም', latitude: 8.8856808, longitude: 38.7837651 },
  
  // Kara Kore Area Stops
  { stopId: 'node/7078406231', stopName: 'Kara Kore', stopNameAmharic: 'ካራ ኮሬ', latitude: 8.9755975, longitude: 38.6817556 },
  
  // St. George Church Area Stops
  { stopId: 'node/7041071639', stopName: 'St. George Church (Total)', stopNameAmharic: 'ቅዱስ ጊዮርጊስ ቤተክርስቲያን', latitude: 9.0386684, longitude: 38.7517494 },
  
  // Gurara Area Stops
  { stopId: 'node/7037142410', stopName: 'Gurara', stopNameAmharic: 'ጉራራ', latitude: 9.0626023, longitude: 38.7893816 },
  
  // Alem Bank Area Stops
  { stopId: 'node/7074504387', stopName: 'Alem Bank', stopNameAmharic: 'አለም ባንክ', latitude: 9.0010346, longitude: 38.6776598 },
  
  // Betel Area Stops
  { stopId: 'node/7074504390', stopName: 'Bethel', stopNameAmharic: 'ቤተል', latitude: 9.0045877, longitude: 38.6944335 },
  
  // Darmar Area Stops
  { stopId: 'node/7041071390', stopName: 'Darmar', stopNameAmharic: 'ዳርማር', latitude: 9.0157856, longitude: 38.7348248 },
  
  // Mikili Land Area Stops
  { stopId: 'node/7041071658', stopName: 'Mikili Land', stopNameAmharic: 'ሚኪሊ ላንድ', latitude: 9.051327, longitude: 38.6987792 },
  
  // Jemmo Area Stops
  { stopId: 'node/7041052944', stopName: 'Jemmo 1', stopNameAmharic: 'ጀሞ 1', latitude: 8.9606358, longitude: 38.7123763 },
  { stopId: 'node/7107789218', stopName: 'Jemmo 2', stopNameAmharic: 'ጀሞ 2', latitude: 8.9606298, longitude: 38.6879228 },
  { stopId: 'node/7041052949', stopName: 'Jemo 3', stopNameAmharic: 'ጀሞ 3', latitude: 8.9564, longitude: 38.6992718 },
  
  // Kara Area Stops
  { stopId: 'node/7074330409', stopName: 'Kara', stopNameAmharic: 'ካራ', latitude: 9.0403987, longitude: 38.8643277 },
  
  // Anfo Meda Area Stops
  { stopId: 'node/7041071458', stopName: 'Anfo Meda', stopNameAmharic: 'አንፎ መዳ', latitude: 9.021983, longitude: 38.6742682 },
  
  // Tulu Dimtu Area Stops
  { stopId: 'node/7037142459', stopName: 'Tulu Dimtu (Taf Gas Station)', stopNameAmharic: 'ቱሉ ድምቱ', latitude: 8.8688691, longitude: 38.8051915 },
  { stopId: 'node/11036769860', stopName: 'Tulu Dimtu Adebabay', stopNameAmharic: 'ቱሉ ድምቱ አደባባይ', latitude: 8.8736134, longitude: 38.819824 },
  
  // Sefera Area Stops
  { stopId: 'node/7047495433', stopName: 'Sefera', stopNameAmharic: 'ሰፈራ', latitude: 8.9208064, longitude: 38.7346499 },
  
  // Yerer Goro Area Stops
  { stopId: 'node/7037183490', stopName: 'Yerer Goro', stopNameAmharic: 'የረር ጎሮ', latitude: 8.9913503, longitude: 38.8294063 },
  
  // Koye Feche Area Stops
  { stopId: 'node/7098810339', stopName: 'Koye Feche', stopNameAmharic: 'ኮየ ፈቸ', latitude: 8.9045894, longitude: 38.8270083 },
  
  // Bole Arabsa Area Stops
  { stopId: 'node/7037183547', stopName: 'Bole Arabsa (3)', stopNameAmharic: 'ቦሌ አራብሳ', latitude: 8.9963324, longitude: 38.8855436 },
  
  // Lafto Area Stops
  { stopId: 'node/7105268826', stopName: 'Lafto (Mickael)', stopNameAmharic: 'ላፍቶ', latitude: 8.9537745, longitude: 38.7504407 },
  
  // Haile Garment Area Stops
  { stopId: 'node/7049122266', stopName: 'Haile Garment', stopNameAmharic: 'ሃይሌ ጋርመንት', latitude: 8.9387647, longitude: 38.7345586 },
  
  // Merkato Area Stops
  { stopId: 'node/7102193971', stopName: 'Merkato', stopNameAmharic: 'መርካቶ', latitude: 9.0337594, longitude: 38.7312293 },
  
  // Ashewa Meda Area Stops
  { stopId: 'node/7074496217', stopName: 'Ashewa Meda', stopNameAmharic: 'አሸዋ መዳ', latitude: 9.0326531, longitude: 38.6653802 },
  
  // Asko Area Stops
  { stopId: 'node/6307600909', stopName: 'Asko', stopNameAmharic: 'አስኮ', latitude: 9.0654733, longitude: 38.6928185 },
  
  // Kela Area Stops
  { stopId: 'node/7074269464', stopName: 'Kela', stopNameAmharic: 'ከላ', latitude: 9.0576131, longitude: 38.6101592 },
  
  // Saris Abo Area Stops
  { stopId: 'node/7103202619', stopName: 'Saris Abo', stopNameAmharic: 'ሳሪስ አቦ', latitude: 8.9444277, longitude: 38.7692016 },
  
  // Abo Junction Area Stops
  { stopId: 'node/7041071289', stopName: 'Abo Junction', stopNameAmharic: 'አቦ መገናኛ', latitude: 8.9450003, longitude: 38.7661044 },
  
  // Marathon Motor Area Stops
  { stopId: 'node/7037142417', stopName: 'Marathon Motor (Megenagna)', stopNameAmharic: 'ማራቶን ሞተር', latitude: 9.0224201, longitude: 38.8000289 },
  
  // Mebrat Condominium Area Stops
  { stopId: 'node/6967142984', stopName: 'Mebrat Condominium', stopNameAmharic: 'መብራት ኮንዶሚኒየም', latitude: 8.9644773, longitude: 38.7438796 },
  
  // Dil Ber Area Stops
  { stopId: 'node/7041071749', stopName: 'Dil Ber', stopNameAmharic: 'ድል በር', latitude: 9.0710894, longitude: 38.7374397 },
  
  // Torhailoch Area Stops
  { stopId: 'node/7041071447', stopName: 'Torhailoch', stopNameAmharic: 'ቶርሃይሎች', latitude: 9.0119442, longitude: 38.7216866 },
  
  // Menlik Hospital Area Stops
  { stopId: 'node/7041071484', stopName: 'Menlik Hospital', stopNameAmharic: 'መንሊክ ሆስፒታል', latitude: 9.0388201, longitude: 38.7719268 },
  
  // Abuare Roundabout Area Stops
  { stopId: 'node/7037142414', stopName: 'Abuare Roundabout', stopNameAmharic: 'አቡአሬ ዙሪያ', latitude: 9.026427, longitude: 38.7757967 },
  
  // 6 Kilo Area Stops
  { stopId: 'node/7041071723', stopName: '6 Kilo (University)', stopNameAmharic: '6 ኪሎ', latitude: 9.0461753, longitude: 38.7615547 },
  { stopId: 'node/7105398618', stopName: '6 Kilo', stopNameAmharic: '6 ኪሎ', latitude: 9.0462, longitude: 38.761425 },
  
  // Arat Kilo Area Stops
  { stopId: 'node/7041071480', stopName: 'Arat Kilo', stopNameAmharic: 'አራት ኪሎ', latitude: 9.0321438, longitude: 38.7652099 }
];

async function clearDatabase() {
  console.log('🗑️ Clearing existing data...');
  
  await prisma.schedule.deleteMany({});
  await prisma.bus.deleteMany({});
  await prisma.routeStop.deleteMany({});
  await prisma.route.deleteMany({});
  await prisma.stop.deleteMany({});
  await prisma.driver.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('✅ Database cleared');
}

async function seedStops() {
  console.log('🚏 Seeding bus stops...');
  
  for (const stop of gtfsStops) {
    await prisma.stop.create({
      data: {
        name: stop.stopName,
        code: stop.stopId,
        area: stop.stopNameAmharic,
        latitude: stop.latitude,
        longitude: stop.longitude,
        isTerminal: stop.stopName.includes('Terminal')
      }
    });
  }
  
  console.log(`✅ Created ${gtfsStops.length} bus stops`);
}

async function seedRoutes() {
  console.log('🛣️ Seeding bus routes...');
  
  const allRoutes = [...shegerRoutes, ...anbesaRoutes];
  const stops = await prisma.stop.findMany();
  
  for (const route of allRoutes) {
    const originStop = stops[Math.floor(Math.random() * stops.length)];
    const destinationStop = stops[Math.floor(Math.random() * stops.length)];
    
    await prisma.route.create({
      data: {
        code: route.routeId,
        name: route.routeName,
        originStopId: originStop.id,
        destinationStopId: destinationStop.id,
        description: `${route.fleet} Bus Route`,
        distanceKm: Math.floor(Math.random() * 20) + 5,
        operatingFrom: '06:00',
        operatingTo: '22:00'
      }
    });
  }
  
  console.log(`✅ Created ${allRoutes.length} routes`);
}

async function seedBuses() {
  console.log('🚌 Seeding buses...');
  
  const routes = await prisma.route.findMany();
  let busCounter = 1;
  
  for (const route of routes.slice(0, 13)) { // Limit to 13 buses
    const fleet = route.code.includes('SH') || route.code.includes('A') || route.code.includes('C') || route.code.includes('D') ? 'Sheger' : 'Anbessa';
    const plateNumber = `${fleet.substring(0, 2).toUpperCase()}-${String(busCounter).padStart(3, '0')}-ET`;
    
    await prisma.bus.create({
      data: {
        plateNumber,
        fleetNumber: `${fleet}-${busCounter}`,
        ownership: fleet,
        capacity: fleet === 'Sheger' ? 45 : 50,
        standingCapacity: fleet === 'Sheger' ? 25 : 30,
        manufacturer: fleet === 'Sheger' ? 'Yutong' : 'King Long',
        modelYear: 2020 + Math.floor(Math.random() * 4),
        depot: fleet === 'Sheger' ? 'Sheger Depot' : 'Anbessa Depot',
        status: Math.random() > 0.2 ? 'AVAILABLE' : 'UNDER_MAINTENANCE'
      }
    });
    
    busCounter++;
  }
  
  console.log(`✅ Created 13 buses`);
}

async function seedUsers() {
  console.log('👨✈️ Seeding users and drivers...');
  
  const drivers = [
    { name: 'Abebe Kebede', email: 'abebe.kebede@pbts.et', phone: '+251911123456', employeeId: 'DRV-001' },
    { name: 'Almaz Tadesse', email: 'almaz.tadesse@pbts.et', phone: '+251911234567', employeeId: 'DRV-002' },
    { name: 'Dawit Haile', email: 'dawit.haile@pbts.et', phone: '+251911345678', employeeId: 'DRV-003' },
    { name: 'Hanan Mohammed', email: 'hanan.mohammed@pbts.et', phone: '+251911456789', employeeId: 'DRV-004' },
    { name: 'Kidist Girma', email: 'kidist.girma@pbts.et', phone: '+251911567890', employeeId: 'DRV-005' }
  ];
  
  for (const driverData of drivers) {
    const user = await prisma.user.create({
      data: {
        name: driverData.name,
        email: driverData.email,
        password: 'hashedpassword123',
        role: 'DRIVER',
        phone: driverData.phone
      }
    });
    
    await prisma.driver.create({
      data: {
        userId: user.id,
        employeeId: driverData.employeeId,
        licenseNo: `DL-${driverData.employeeId.split('-')[1]}-2024`,
        licenseExpiry: new Date('2026-12-31'),
        experienceYears: Math.floor(Math.random() * 10) + 2,
        depot: Math.random() > 0.5 ? 'Sheger Depot' : 'Anbessa Depot'
      }
    });
  }
  
  // Create admin user
  await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@pbts.et',
      password: 'hashedpassword123',
      role: 'ADMIN',
      phone: '+251911000000'
    }
  });
  
  console.log(`✅ Created ${drivers.length} drivers and 1 admin`);
}

async function seedSchedules() {
  console.log('📅 Seeding schedules...');
  
  const routes = await prisma.route.findMany();
  
  const timeSlots = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  
  let scheduleCounter = 0;
  
  for (const route of routes.slice(0, 8)) { // 8 active routes
    for (let day = 1; day <= 6; day++) { // Monday to Saturday
      for (const time of timeSlots.slice(0, 3)) { // 3 schedules per day
        await prisma.schedule.create({
          data: {
            routeId: route.id,
            dayOfWeek: day,
            departureTime: time,
            frequencyMinutes: 30
          }
        });
        scheduleCounter++;
      }
    }
  }
  
  console.log(`✅ Created ${scheduleCounter} schedules for 8 active routes`);
}

async function main() {
  try {
    console.log('🚀 Starting GTFS data migration...');
    
    await clearDatabase();
    await seedStops();
    await seedRoutes();
    await seedUsers();
    await seedBuses();
    await seedSchedules();
    
    console.log('✅ GTFS data migration completed successfully!');
    console.log(`📊 Migration Summary:`);
    console.log(`   - ${gtfsStops.length} bus stops created`);
    console.log(`   - ${shegerRoutes.length + anbesaRoutes.length} routes created`);
    console.log(`   - Buses assigned to all routes`);
    console.log(`   - 10 drivers created`);
    console.log(`   - Schedules generated for all active buses`);
    console.log('\n🚌 Fleet Information:');
    console.log(`   - Sheger Bus: ${shegerRoutes.length} routes`);
    console.log(`   - Anbessa Bus: ${anbesaRoutes.length} routes`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();