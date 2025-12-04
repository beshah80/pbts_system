// GTFS Data Parser for Sheger and Anbessa Bus Systems
export class GTFSParser {
  static parseCSV(csvText: string): any[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const values = line.split(',').map(v => v.trim());
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
    }
    return data;
  }

  static async loadShegerData() {
    const routes = `route_short_name,route_id,route_type,route_long_name,agency_id,route_desc,route_color,route_text_color
SH027,10458768,3,Shero Meda ↔ Bole Millenium,AA,,1779c2,ffffff
SH028,10460046,3,Shero Meda ↔ Abo Junction,AA,,1779c2,ffffff
SH016,10460168,3,Piassa Arada ↔ Abo Junction,AA,,1779c2,ffffff
SH004,10460407,3,Yeka Abado ↔ Megenagna,AA,,1779c2,ffffff
SH010,10460602,3,Autobis Tera (2) ↔ Alem Bank,AA,,1779c2,ffffff
A10,10460963,3,Mexico ↔ Haile Garment,AA,,1779c2,ffffff
SH040,10461811,3,Kara Kore ↔ Autobis Tera (1),AA,,1779c2,ffffff
D26,10465903,3,Yerer Goro ↔ Megenagna,AA,,1779c2,ffffff
A24,10466290,3,Mexico ↔ Megenagna,AA,,1779c2,ffffff
C15,10466725,3,Piassa Arada ↔ Mebrat Condominium,AA,,1779c2,ffffff`;

    const stops = `stop_name,stop_lon,stop_id,stop_lat,parent_station,location_type
Black Lion,38.7521415,node/847244423,9.0209237,,0
4 Kilo,38.7632408,node/4832025024,9.0344007,,0
Sar Bet (Roundabout),38.738182,node/5248250425,8.9929728,,0
Ambassador,38.7553162,node/5330678521,9.0164409,,0
Stadium,38.7570321,node/5736089088,9.0120276,,0
Mebrathail,38.7146778,node/6251054285,9.0295451,,0
Asko,38.6928185,node/6307600909,9.0654733,,0
Bole Printing Press,38.7718334,node/6373574986,8.9976331,,0
Mexico,38.7444332,node/6814022390,9.0094665,,0
Mebrat Condominium,38.7438796,node/6967142984,8.9644773,,0
Mebrat,38.7486643,node/6967165728,8.9673396,,0
Gofa Gebriel,38.7491221,node/6967179322,8.9771232,,0
Kera (Gofa Road),38.7498599,node/6967179323,8.9825519,,0
Tewodros Square,38.7516602,node/6967225474,9.0277111,,0
German Square,38.732897,node/6967234177,8.9655968,,0
Friendship Building,38.7859995,node/6967281153,8.9899905,,0
Piassa (Downtown Cafe),38.7512565,node/6967281241,9.0319356,,0
Piassa Arada (2),38.7526242,node/6967281242,9.0330123,,0
Gojo,38.6217166,node/6967318740,9.0418236,,0
Megenagna Terminal,38.8026673,node/7022361366,9.0203188,,0
Bole Millenium,38.7897496,node/7022397409,8.9885373,,0
Goro School,38.8267584,node/7022397411,8.9937973,,0
Summit Condominiums,38.8569749,node/7022397413,8.9842709,,0
Bole Arabsa,38.8906061,node/7022397416,8.9720161,,0
Aba Kiros Roundabout,38.8785328,node/7022397418,9.0561234,,0
Yeka Abado,38.875565,node/7022397420,9.0689298,,0
Gurara,38.7893816,node/7037142410,9.0626023,,0
Marathon Motor (Megenagna),38.8000289,node/7037142417,9.0224201,,0
Biret Dildiy (Bono Wuha),38.7811505,node/7037142421,9.0598571,,0
Dinberwa Hospital,38.7866932,node/7037142428,9.0221273,,0
Kokebe Tsebah School,38.7802113,node/7037142430,9.0345238,,0
British Embassy,38.784892,node/7037142434,9.0311083,,0
Abebe Sook,38.7887162,node/7037142436,9.0287538,,0
Shola Gebeya,38.7952986,node/7037142438,9.0250779,,0
Yeka Michael,38.7961373,node/7037142439,9.0244101,,0
Megenagna,38.8021491,node/7037142441,9.0180934,,0`;

    return {
      routes: this.parseCSV(routes),
      stops: this.parseCSV(stops)
    };
  }

  static async loadAnbesaData() {
    const routes = `route_id,route_short_name,route_type,agency_id,route_long_name,route_desc,route_color,route_text_color
10400029,AB097,3,AA,Megenegna Terminal ↔ Legedadi Mission,,1779c2,ffffff
10400258,AB101,3,AA,Megenagna Terminal ↔ Aba Kiros Roundabout,,1779c2,ffffff
10400405,AB049,3,AA,Megenegna Terminal ↔ Ayat Chefe Condominium,,1779c2,ffffff
10406491,AB083,3,AA,Ayat Chefe Condominium ↔ 6 Kilo,,1779c2,ffffff
10407732,AB010,3,AA,Kotebe Teachers College ↔ Piassa Arada,,1779c2,ffffff
10410198,AB009,3,AA,Piassa Arada ↔ Brass Clinic (Bole),,1779c2,ffffff
10441511,AB061,3,AA,Legehar (Old Train Station) ↔ Ayat Chefe Condominium,,1779c2,ffffff
10547202,AB032,3,AA,Hanna Mariam ↔ Legehar (Old Train Station),,1779c2,ffffff
10550063,AB018,3,AA,Yeshi Debele ↔ Autobis Tera,,1779c2,ffffff
10550163,AB087,3,AA,Winget ↔ Ayer Tena (Terminal),,1779c2,ffffff`;

    const stops = `stop_id,stop_name,location_type,parent_station,stop_lon,stop_lat
node/847244293,Beherawi Theatre,0,,38.7525538,9.0165395
node/847244423,Black Lion,0,,38.7521415,9.0209237
node/4832025024,4 Kilo,0,,38.7632408,9.0344007
node/4884374622,Lamberet Terminal (Bus),0,,38.8158571,9.0223057
node/5248250425,Sar Bet (Roundabout),0,,38.738182,8.9929728
node/5330678521,Ambassador,0,,38.7553162,9.0164409
node/5736089088,Stadium,0,,38.7570321,9.0120276
node/6251054285,Mebrathail,0,,38.7146778,9.0295451
node/6307600909,Asko,0,,38.6928185,9.0654733
node/6373574986,Bole Printing Press,0,,38.7718334,8.9976331
node/6798927886,Kebede Wessene Rd.,0,,38.8053365,8.9986049
node/6967165728,Mebrat,0,,38.7486643,8.9673396
node/6967179322,Gofa Gebriel,0,,38.7491221,8.9771232
node/6967179323,Kera (Gofa Road),0,,38.7498599,8.9825519
node/6967234177,German Square,0,,38.732897,8.9655968
node/6967281153,Friendship Building,0,,38.7859995,8.9899905
node/6967281241,Piassa (Downtown Cafe),0,,38.7512565,9.0319356
node/6967281242,Piassa Arada (2),0,,38.7526242,9.0330123
node/6967318740,Gojo,0,,38.6217166,9.0418236
node/7022361366,Megenagna Terminal,0,,38.8026673,9.0203188`;

    return {
      routes: this.parseCSV(routes),
      stops: this.parseCSV(stops)
    };
  }
}