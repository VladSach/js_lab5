const DB = `
{
    "products": [{
        "url": "ghost_of_tsushima",
        "title": "Ghost of Tsushima",
        "platform": ["Playstation 4", "", ""],
        "price": 1349,
        "genres": ["Action", "Adventure"],
        "image": "./images/products_img/ghost_of_tsushima.webp",
        "backgroundImage": "./images/products-bg-img/ghost_of_tsushima.png",
        "languages": ["English", ""],
        "description": "<p>Ghost of Tsushima is a 2020 action-adventure game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Featuring an open world, it follows Jin Sakai, a samurai on a quest to protect Tsushima Island during the first Mongol invasion of Japan. The game was released on July 17, 2020 for PlayStation 4. Ghost of Tsushima received praise for its visuals and combat but was criticized for its open world activities. Ghost of Tsushima received several award nominations and wins. </p>",
        "sold": 650
    },
    {
        "url": "spyro_reignited_trilogy",
        "title": "Spyro Reignited Trilogy",
        "platform": ["Playstation 4", "", "Nintendo Switch"],
        "price": 589,
        "genres": ["Adventure", "Platformer"],
        "image": "./images/products_img/spyro_reignited_trilogy.webp",
        "backgroundImage": "./images/products-bg-img/spyro_reignited_trilogy.png",
        "languages": ["English", "Russian"],
        "description": "<p>Spyro Reignited Trilogy is a platform video game developed by Toys for Bob and published by Activision. It is a collection of remasters of the first three games in the Spyro series: Spyro the Dragon (1998), Ripto's Rage! (1999), and Year of the Dragon (2000). It was released for the PlayStation 4 and Xbox One in November 2018 and for Microsoft Windows and Nintendo Switch in September 2019. </p>",
        "sold": 611
    },
    {
        "url": "jedi_fallen_order",
        "title": "Jedi: Fallen Order",
        "platform": ["Playstation 4", "Xbox One", ""],
        "price": 929,
        "genres": ["Action", "Roleplaying"],
        "image": "./images/products_img/jedi_fallen_order.webp",
        "backgroundImage": "./images/products-bg-img/jedi_fallen_order.png",
        "languages": ["English", "Russian"],
        "description": "<p>Star Wars Jedi: Fallen Order is an action-adventure game developed by Respawn Entertainment and published by Electronic Arts. It was released for Windows, PlayStation 4, and Xbox One on November 15, 2019.</p>",
        "sold": 870
    },
    {
        "url": "days_gone",
        "title": "Days Gone",
        "platform": ["Playstation 4", "", ""],
        "price": 499,
        "genres": ["Action", "Adventure", "Horror"],
        "image": "./images/products_img/days_gone.webp",
        "backgroundImage": "./images/products-bg-img/days_gone.png",
        "languages": ["English", "Russian"],
        "description": "<p>Days Gone is a 2019 action-adventure survival horror video game developed by SIE Bend Studio and published by Sony Interactive Entertainment for the PlayStation 4. </p>",
        "sold": 500
    },
    {
        "url": "resident_evil_2",
        "title": "RESIDENT EVIL 2",
        "platform": ["Playstation 4", "", ""],
        "price": 699,
        "genres": ["Action", "Shooter", "Horror"],
        "image": "./images/products_img/resident_evil_2.webp",
        "backgroundImage": "./images/products-bg-img/resident_evil_2.png",
        "languages": ["English", "Russian"],
        "description": "<p>Resident Evil 2 is a science fiction survival horror game developed and published by Capcom. A remake of the 1998 game of the same name, it was released for Microsoft Windows, PlayStation 4, and Xbox One on January 25, 2019. Players control rookie police officer Leon S. Kennedy and college student Claire Redfield as they attempt to escape Raccoon City during a zombie outbreak. </p>",
        "sold": 4321
    },
    {
        "url": "sekiro_shadows_die_twice",
        "title": "Sekiro: Shadows Die Twice",
        "platform": ["Playstation 4", "Xbox One", ""],
        "price": 869,
        "genres": ["Action", "Adventure"],
        "image": "./images/products_img/sekiro_shadows_die_twice.webp",
        "backgroundImage": "./images/products-bg-img/sekiro_shadows_die_twice.png",
        "languages": ["English", "Japanese"],
        "description": "<p>Sekiro: Shadows Die Twice is an action-adventure video game developed by FromSoftware and published by Activision. The game follows a shinobi known as Wolf as he attempts to take revenge on a samurai clan who attacked him and kidnapped his lord. It was released for Microsoft Windows, PlayStation 4, and Xbox One in March 2019 and for Stadia in October 2020. </p>",
        "sold": 1347
    },
    {
        "url": "metro_exodus",
        "title": "Metro Exodus",
        "platform": ["Playstation 4", "Xbox One", ""],
        "price": 749,
        "genres": ["Action", "Adventure", "Shooter"],
        "image": "./images/products_img/metro_exodus.webp",
        "backgroundImage": "./images/products-bg-img/metro_exodus.png",
        "languages": ["English", "Russian"],
        "description": "<p>Metro Exodus is a first-person shooter video game developed by 4A Games and published by Deep Silver. It is the third installment in the Metro video game trilogy based on Dmitry Glukhovsky's novels, following the events of Metro 2033 and Metro: Last Light. It released in 2019 for Microsoft Windows, PlayStation 4, Xbox One and Stadia and in 2020 for Amazon Luna.</p>",
        "sold": 1883 
    },
    {
        "url": "deus_ex_mankind_divided",
        "title": "Deus Ex: Mankind Divided",
        "platform": ["Playstation 4", "Xbox One", ""],
        "price": 549,
        "genres": ["Action", "Adventure", "Roleplaying"],
        "image": "./images/products_img/deus_ex_mankind_divided.webp",
        "backgroundImage": "./images/products-bg-img/deus_ex_mankind_divided.png",
        "languages": ["English", "Russian"],
        "description": "<p>Deus Ex: Mankind Divided is an action role-playing video game developed by Eidos Montréal and published worldwide by Square Enix in August 2016 for Microsoft Windows, PlayStation 4, and Xbox One. Versions for Linux and macOS systems were released in 2016 and 2017, respectively.</p>",
        "sold": 1479 
    },
    {
        "url": "witcher_3",
        "title": "Witcher 3: Wild Hunt",
        "platform": ["Playstation 4", "Xbox One", "Nintendo Switch"],
        "price": 799,
        "genres": ["Action", "Roleplaying", ""],
        "image": "./images/products_img/witcher_3.webp",
        "backgroundImage": "./images/products-bg-img/witcher_3.png",
        "languages": ["English", "Russian"],
        "description": "<p>The Witcher 3: Wild Hunt is a 2015 action role-playing game developed and published by Polish developer CD Projekt Red and is based on The Witcher series of fantasy novels written by Andrzej Sapkowski. It is the sequel to the 2011 game The Witcher 2: Assassins of Kings and the third main installment in The Witcher's video game series, played in an open world with a third-person perspective.</p>",
        "sold": 4426 
    },
    {
        "url": "rise_of_the_tomb_rider",
        "title": "Rise of the Tomb Roder",
        "platform": ["", "Xbox One", ""],
        "price": 599,
        "genres": ["Action", "Adventure", "Stealth"],
        "image": "./images/products_img/rise_of_the_tomb_rider.webp",
        "backgroundImage": "./images/products-bg-img/rise_of_the_tomb_rider.png",
        "languages": ["English", ""],
        "description": "<p>Rise of the Tomb Raider is a 2015 action-adventure video game developed by Crystal Dynamics. It is the sequel to the 2013 video game Tomb Raider and the eleventh entry in the Tomb Raider series.</p>",
        "sold": 1970
    },
    {
        "url": "super_mario_odyssey",
        "title": "Super Mario Odyssey",
        "platform": ["", "", "Nintendo Switch"],
        "price": 1699,
        "genres": ["Action", "Adventure", "Platformer"],
        "image": "./images/products_img/super_mario_odyssey.webp",
        "backgroundImage": "./images/products-bg-img/super_mario_odyssey.png",
        "languages": ["English", ""],
        "description": "<p>Super Mario Odyssey is a platform game developed and published by Nintendo for the Nintendo Switch on October 27, 2017.</p>",
        "sold": 935
    },
    {
        "url": "zelda_breath_of_the_wild",
        "title": "Legend of Zelda: Breath of the Wild",
        "platform": ["", "", "Nintendo Switch"],
        "price": 1699,
        "genres": ["Action", "Adventure", "Roleplaying"],
        "image": "./images/products_img/zelda_breath_of_the_wild.webp",
        "backgroundImage": "./images/products-bg-img/zelda_breath_of_the_wild.png",
        "languages": ["English", "Japanese"],
        "description": "<p>The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles. Breath of the Wild is part of the Legend of Zelda franchise and is set at the end of the Zelda timeline.</p>",
        "sold": 4235
    }],
    "actions": [{
        "url": "winter_action",
        "title": "Grab a chance while you still can",
        "image": "./images/slider/image4.webp",
        "description": "New Year Sales are HERE!!!",
        "endDate": "10/01/2021"
    }],
    "orders": []
}`;

export async function getData(){
    return JSON.parse(DB);
}

export function sendRequest(){
    return Promise.resolve({id: 1});
}