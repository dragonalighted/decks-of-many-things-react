

import {guid, defaultObj} from '../objects/defaultObj';

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

const namedColors = [
    { name: "Blacks", colors: [
	"Black"
,	"Night"
,	"Gunmetal"
,	"Midnight"
,	"Charcoal"
,	"Dark Slate Grey"
,	"Oil"
,	"Black Cat"
,	"Iridium"
,	"Black Eel"
,	"Black Cow"
    ]} ,
    {name: "Grays", colors: [
	"Gray Wolf"
,	"Vampire Gray"
,	"Gray Dolphin"
,	"Carbon Gray"
,	"Ash Gray"
,	"Cloudy Gray"
,	"Smokey Gray"
,	"Gray"
,	"Granite"
,	"Battleship Gray"
,	"Gray Cloud"
,	"Gray Goose"
,	"Metallic Silver" ]} ,
    {name: "Blues", colors:[
	"Blue Gray"
,	"Light Slate Gray"
,	"Slate Gray"
,	"Jet Gray"
,	"Mist Blue"
,	"Marble Blue"
,	"Slate Blue"
,	"Steel Blue"
,	"Blue Jay"
,	"Dark Slate Blue"
,	"Midnight Blue"
,	"Navy Blue"
,	"Blue Whale"
,	"Lapis Blue"
,	"Denim Dark Blue"
,	"Earth Blue"
,	"Cobalt Blue"
,	"Blueberry Blue"
,	"Sapphire Blue"
,	"Blue Eyes"
,	"Royal Blue"
,	"Blue Orchid"
,	"Blue Lotus"
,	"Light Slate Blue"
,	"Windows Blue"
,	"Glacial Blue Ice"
,	"Silk Blue"
,	"Blue Ivy"
,	"Blue Koi"
,	"Columbia Blue"
,	"Baby Blue"
,	"Light Steel Blue"
,	"Ocean Blue"
,	"Blue Ribbon"
,	"Blue Dress"
,	"Dodger Blue"
,	"Cornflower Blue"
,	"Sky Blue"
,	"Butterfly Blue"
,	"Iceberg"
,	"Crystal Blue"
,	"Deep Sky Blue"
,	"Denim Blue"
,	"Light Sky Blue"
,	"Day Sky Blue"
,	"Jeans Blue"
,	"Blue Angel"
,	"Pastel Blue"
,	"Sea Blue"
,	"Powder Blue"
,	"Coral Blue"
,	"Light Blue"
,	"Robin Egg Blue"
,	"Light Aquamarine"
,	"Electric Blue"
,	"Aquamarine"
,	"Cyan or Aqua"
,	"Tron Blue"
,	"Blue Zircon"
,	"Blue Lagoon"
,	"Celeste"
,	"Blue Diamond"
,	"Tiffany Blue"
,	"Cyan Opaque"
,	"Blue Hosta"
,	"Northern Lights Blue"
,	"Medium Turquoise"
,	"Turquoise"
,	"Jellyfish"
    ]}, 
    {name: "Greens", colors: [
	"Blue green"
,	"Macaw Blue Green"
,	"Light Sea Green"
,	"Dark Turquoise"
,	"Sea Turtle Green"
,	"Medium Aquamarine"
,	"Greenish Blue"
,	"Grayish Turquoise"
,	"Beetle Green"
,	"Teal"
,	"Sea Green"
,	"Camouflage Green"
,	"Sage Green"
,	"Hazel Green"
,	"Venom Green"
,	"Fern Green"
,	"Dark Forest Green"
,	"Medium Sea Green"
,	"Medium Forest Green"
,	"Seaweed Green"
,	"Pine Green"
,	"Jungle Green"
,	"Shamrock Green"
,	"Medium Spring Green"
,	"Forest Green"
,	"Green Onion"
,	"Spring Green"
,	"Lime Green"
,	"Clover Green"
,	"Green Snake"
,	"Alien Green"
,	"Green Apple"
,	"Yellow Green"
,	"Kelly Green"
,	"Zombie Green"
,	"Frog Green"
,	"Green Peas"
,	"Dollar Bill Green"
,	"Dark Sea Green"
,	"Iguana Green"
,	"Avocado Green"
,	"Pistachio Green"
,	"Salad Green"
,	"Hummingbird Green"
,	"Nebula Green"
,	"Stoplight Go Green"
,	"Algae Green"
,	"Jade Green"
,	"Green"
,	"Emerald Green"
,	"Lawn Green"
,	"Chartreuse"
,	"Dragon Green"
,	"Mint green"
,	"Green Thumb"
,	"Light Jade"
,	"Tea Green"
,	"Green Yellow"
,	"Slime Green"
    ]}, 
    {name: "Yellows", colors:[
	"Goldenrod"
,	"Harvest Gold"
,	"Sun Yellow"
,	"Mustard"
,	"Rubber Ducky Yellow"
,	"Bright Gold"
    ]}, 
    {name: "Browns", colors:[
	"Golden brown"
,	"Macaroni and Cheese"
,	"Saffron"
,	"Beer"
,	"Cantaloupe"
,	"Bee Yellow"
,	"Brown Sugar"
,	"BurlyWood"
,	"Deep Peach"
,	"Ginger Brown"
,	"School Bus Yellow"
,	"Sandy Brown"
,	"Fall Leaf Brown"
,	"Orange Gold"
,	"Sand"
,	"Cookie Brown"
,	"Caramel"
,	"Brass"
,	"Khaki"
,	"Camel brown"
,	"Bronze"
,	"Tiger Orange"
,	"Cinnamon"
,	"Bullet Shell"
,	"Dark Goldenrod"
,	"Copper"
,	"Wood"
,	"Oak Brown"
,	"Moccasin"
,	"Army Brown"
,	"Sandstone"
,	"Mocha"
,	"Taupe"
,	"Coffee"
,	"Brown Bear"
,	"Red Dirt"
,	"Sepia" ]}, 
    {name: "Oranges", colors: [
	"Orange Salmon"
,	"Rust"
,	"Red Fox"
,	"Chocolate"
,	"Sedona"
,	"Papaya Orange"
,	"Halloween Orange"
,	"Pumpkin Orange"
,	"Construction Cone Orange"
,	"Sunrise Orange"
,	"Mango Orange"
,	"Dark Orange"
,	"Coral"
,	"Basket Ball Orange"
,	"Light Salmon"
,	"Tangerine"
,	"Dark Salmon"
,	"Light Coral"
,	"Bean Red"
,	"Valentine Red"
,	"Shocking Orange"
    ]}, 
    {name: "Reds", colors:[
	"Red"
,	"Scarlet"
,	"Ruby Red"
,	"Ferrari Red"
,	"Fire Engine Red"
,	"Lava Red"
,	"Love Red"
,	"Grapefruit"
,	"Chestnut Red"
,	"Cherry Red"
,	"Mahogany"
,	"Chilli Pepper"
,	"Cranberry"
,	"Red Wine"
,	"Burgundy"
,	"Chestnut"
,	"Blood Red"
,	"Sienna"
,	"Sangria"
,	"Firebrick"
,	"Maroon"
,	"Plum Pie"
,	"Velvet Maroon"
,	"Plum Velvet"
,	"Rosy Finch"
,	"Puce"
,	"Dull Purple"
    ]},
    {name: "Pinks", colors:[
	"Rosy Brown"
,	"Khaki Rose"
,	"Pink Bow"
,	"Lipstick Pink"
,	"Rose"
,	"Rose Gold"
,	"Desert Sand"
,	"Pig Pink"
,	"Cotton Candy"
,	"Pink Bubblegum"
,	"Misty Rose"
,	"Pink"
,	"Light Pink"
,	"Flamingo Pink"
,	"Pink Rose"
,	"Pink Daisy"
,	"Cadillac Pink"
,	"Carnation Pink"
,	"Blush Red"
,	"Hot Pink"
,	"Watermelon Pink"
,	"Violet Red"
,	"Deep Pink"
,	"Pink Cupcake"
,	"Pink Lemonade"
,	"Neon Pink"
,	"Magenta"
,	"Dimorphotheca Magenta"
,	"Bright Neon Pink"
,	"Pale Violet Red"
,	"Tulip Pink"
,	"Medium Violet Red"
,	"Rogue Pink"
,	"Burnt Pink"
,	"Bashful Pink"
,	"Dark Carnation Pink"
    ]}, 
    {name:"Purples", colors:[
	"Plum"
,	"Viola Purple"
,	"Purple Iris"
,	"Plum Purple"
,	"Plum Pie"
,	"Plum Velvet"
,	"Indigo"
,	"Purple Monster"
,	"Purple Haze"
,	"Eggplant"
,	"Grape"
,	"Purple Jam"
,	"Dark Orchid"
,	"Purple Flower"
,	"Medium Orchid"
,	"Purple Amethyst"
,	"Dark Violet"
,	"Violet"
,	"Purple Sage Bush"
,	"Lovely Purple"
,	"Purple"
,	"Aztech Purple"
,	"Medium Purple"
,	"Jasmine Purple"
,	"Purple Daffodil"
,	"Tyrian Purple"
,	"Crocus Purple"
,	"Purple Mimosa"
,	"Heliotrope Purple"
,	"Crimson"
,	"Purple Dragon"
,	"Lilac"
,	"Blush Pink"
,	"Mauve"
,	"Wisteria Purple"
,	"Blossom Pink"
,	"Thistle"
,	"Periwinkle"
,	"Lavender Pinocchio"
,	"Lavender blue"]}
]


const MAX_FAVORITES = 15; 
const STORAGE_KEY = `${guid}_fav_colors`;
class FavoriteColors {


    get Favorites() {
        return FavoriteColors.Favorites();
    }

    addRgb(red, green, blue) {
        return FavoriteColors.AddToFavorites({red, green, blue}); 
    }
    addColor(color){
        return FavoriteColors.AddToFavorites(color);
    }
    addColors(colors) {
        return FavoriteColors.AddToFavorites(colors);
    } 

    static Favorites(favorites){
        if(!favorites ) {
            let colors = localStorage[STORAGE_KEY] ;
            if( colors ) return JSON.parse();
            return ['Black', 'White', 'Maroon', 'Green', 'Navy', 'Dark Grey']; 
        } else if( Array.isArray(favorites)) {
            localStorage[STORAGE_KEY] = JSON.stringify(favorites);
        }  
    }

    static AddToFavorites(color){
        let favs = FavoriteColors.Favorites();
        if(Array.isArray(color) ) {
            favs.concat( color );
        } else {
            switch(typeof(color)) {
                case 'string' :
                    favs.splice(0,0, color.trim());  
                    break; 
                case 'object' :
                    if(color.color !== undefined ) {color =  color.color;}
                    else {
                        let red = Number(color.red || color.r || 0).clamp(0, 255); 
                        let green = Number(color.green || color.g || 0).clamp(0,255);  
                        let blue = Number(color.blue || color.b || 0).clamp(0,255); 
                        color = `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
                        color = color.toUpper();
                        favs.splice(0,0, color.trim());  
                    }  
                    break;
                default : return;  
            } 
        } 
    
        favs = favs.map((i, v) => v.trim()).unique();
        if(favs.length > MAX_FAVORITES) { favs = favs.splice(MAX_FAVORITES + 1); } 
        FavoriteColors.Favorites(favs);
        return favs; 
    }

    static cleanColor(color) {
        return color.replace(' ', '');
    }

}

export {namedColors, FavoriteColors} ;