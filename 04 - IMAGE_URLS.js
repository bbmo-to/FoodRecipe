// 04 - IMAGE_URLS.js
// GitHub Raw Image URLs

const GITHUB_USERNAME = "bbmo-to"; // From your image URLs pattern
const GITHUB_REPO = "food-recipe-images";
const GITHUB_BRANCH = "main";

function getGitHubImageUrl(filename) {
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filename}`;
}

// Image URLs for local recipes
const imageUrls = {
    // Main Dish
    kareKare: getGitHubImageUrl("01 MAIN DISH - KARE-KARE.jpg"),
    lechonBelly: getGitHubImageUrl("01 MAIN DISH - LECHON BELLY.webp"),
    adobongPuti: getGitHubImageUrl("01 MAIN DISH - ADOBONG PUTI.jpg"),
    adobongPusit: getGitHubImageUrl("01 MAIN DISH - ADOBONG PUSIT.webp"),
    paksiwBangus: getGitHubImageUrl("01 MAIN DISH - PAKSIW NA BANGUS.jpg"),
    bulgogi: getGitHubImageUrl("01 MAIN DISH - BULGOGI.webp"),
    bibimbap: getGitHubImageUrl("01 MAIN DISH - BIBIMBAP.jpg"),
    galbi: getGitHubImageUrl("01 MAIN DISH - GALBI.jpg"),
    kimchi: getGitHubImageUrl("01 MAIN DISH - KIMCHI.webp"),
    jajang: getGitHubImageUrl("01 MAIN DISH - JAJANG.webp"),
    pekingDuck: getGitHubImageUrl("01 MAIN DISH - PEKING DUCK.webp"),
    mapoTofu: getGitHubImageUrl("01 MAIN DISH - MAPO TOFU.jpg"),
    kungPao: getGitHubImageUrl("01 MAIN DISH - KUNG PAO.webp"),
    dumplings: getGitHubImageUrl("01 MAIN DISH - DUMPLINGS.webp"),
    sweetSour: getGitHubImageUrl("01 MAIN DISH - sweet and sour.webp"),
    padThai: getGitHubImageUrl("01 MAIN DISH - pad thai.webp"),
    tomYum: getGitHubImageUrl("01 MAIN DISH - tom yung goong.webp"),
    greenCurry: getGitHubImageUrl("01 MAIN DISH - green curry.jpg"),
    padKraPao: getGitHubImageUrl("01 MAIN DISH - pad kra pao.jpg"),
    massaman: getGitHubImageUrl("01 MAIN DISH - massaman.webp"),
    beefNoodle: getGitHubImageUrl("01 MAIN DISH - beef noodle.webp"),
    luRouFan: getGitHubImageUrl("01 MAIN DISH - lu rou fan.jpg"),
    threeCup: getGitHubImageUrl("01 MAIN DISH - three cup chicken.webp"),
    oyster: getGitHubImageUrl("01 MAIN DISH - oyster.jpg"),
    guaBao: getGitHubImageUrl("01 MAIN DISH - gua bao.jpg"),
    salmonSushi: getGitHubImageUrl("01 MAIN DISH - salmon sushi.webp"),
    ramen: getGitHubImageUrl("01 MAIN DISH - ramen.jpg"),
    tonkatsu: getGitHubImageUrl("01 MAIN DISH - tonkatsu.webp"),
    okono: getGitHubImageUrl("01 MAIN DISH - okono.jpg"),
    unagiDon: getGitHubImageUrl("01 MAIN DISH - unagi don.webp"),
    pierogi: getGitHubImageUrl("01 MAIN DISH - pierogi dumplings.jpg"),
    borscht: getGitHubImageUrl("01 MAIN DISH - bors.webp"),
    goulash: getGitHubImageUrl("01 MAIN DISH - goulash.jpg"),
    sarma: getGitHubImageUrl("01 MAIN DISH - sarma.jpg"),
    chickenKiev: getGitHubImageUrl("01 MAIN DISH - chicken kiev.jpg"),
    cheeseburger: getGitHubImageUrl("01 MAIN DISH - cheeseburger.jpg"),
    bbqRibs: getGitHubImageUrl("01 MAIN DISH - bbq ribs.jpg"),
    friedChicken: getGitHubImageUrl("01 MAIN DISH - fried chicken.jpg"),
    potRoast: getGitHubImageUrl("01 MAIN DISH - pot roast.jpg"),
    clamChowder: getGitHubImageUrl("01 MAIN DISH - CLAM CHOWDER.jpg")
};
