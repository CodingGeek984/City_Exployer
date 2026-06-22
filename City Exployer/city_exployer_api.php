<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

error_reporting(0);

$requestUri = $_SERVER['REQUEST_URI'];

if (strpos($requestUri, '/city_exployer_api.php/image.png') === 0) {
    createImage($_GET['title'] ?? 'City Event');
    exit();
}

switch ($requestUri) {

    case '/city_exployer_api.php/places.json':
        header('Content-Type: application/json');
        echo json_encode(getPlaces());
        break;

    case '/city_exployer_api.php/weather.json':
        header('Content-Type: application/json');
        echo json_encode(getWeather());
        break;

    default:
        if (strpos($requestUri, '/city_exployer_api.php/activities.json') === 0) {
            header('Content-Type: application/json');
            echo json_encode(getActivities());
        } else {
            header('Content-Type: application/json');
            echo json_encode([
                "endpoints" => [
                    "/city_exployer_api.php/places.json",
                    "/city_exployer_api.php/activities.json",
                    "/city_exployer_api.php/weather.json"
                ]
            ]);
        }
        break;
}

function getPlaces() {
    return [
        "Central Park" => [
            "address" => "Main Street 1",
            "rating" => rand(3, 5)
        ],
        "City Museum" => [
            "address" => "Museum Ave 12",
            "rating" => rand(3, 5)
        ],
        "River Walk" => [
            "address" => "River Road",
            "rating" => rand(3, 5)
        ],
        "Shopping Mall" => [
            "address" => "Mall Street 99",
            "rating" => rand(3, 5)
        ],
        "Cinema City" => [
            "address" => "Cinema Blvd 7",
            "rating" => rand(3, 5)
        ]
    ];
}

function getWeather() {
    $data = [];
    $date = new DateTime();

    for ($i = 0; $i < 5; $i++) {
        $data[] = [
            "date" => $date->format('Y-m-d'),
            "status" => ["Sunny", "Cloudy", "Rainy"][rand(0, 2)],
            "temp" => rand(15, 30)
        ];
        $date->add(new DateInterval('P1D'));
    }

    return $data;
}

function getActivities() {

    $activities = [
        ["title" => "Music Festival", "image" => "/city_exployer_api.php/image.png?title=Music Festival", "date" => "2026-05-01"],
        ["title" => "Food Fair", "image" => "/city_exployer_api.php/image.png?title=Food Fair", "date" => "2026-05-03"],
        ["title" => "Art Expo", "image" => "/city_exployer_api.php/image.png?title=Art Expo", "date" => "2026-05-05"],
        ["title" => "Tech Meetup", "image" => "/city_exployer_api.php/image.png?title=Tech Meetup", "date" => "2026-05-07"],
        ["title" => "City Marathon", "image" => "/city_exployer_api.php/image.png?title=Marathon", "date" => "2026-05-10"],
        ["title" => "Night Party", "image" => "/city_exployer_api.php/image.png?title=Party", "date" => "2026-05-12"],
        ["title" => "Startup Pitch", "image" => "/city_exployer_api.php/image.png?title=Startup", "date" => "2026-05-15"],
        ["title" => "Cinema Night", "image" => "/city_exployer_api.php/image.png?title=Cinema", "date" => "2026-05-18"],
        ["title" => "Gaming Expo", "image" => "/city_exployer_api.php/image.png?title=Gaming", "date" => "2026-05-20"],
        ["title" => "Book Fair", "image" => "/city_exployer_api.php/image.png?title=Books", "date" => "2026-05-25"],
    ];

    // фильтр по дате
    if (isset($_GET['from']) && isset($_GET['to'])) {
        $from = new DateTime($_GET['from']);
        $to = new DateTime($_GET['to']);

        $activities = array_filter($activities, function ($item) use ($from, $to) {
            $date = new DateTime($item['date']);
            return $date >= $from && $date <= $to;
        });
    }

    // пагинация
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 3;
    $offset = ($page - 1) * $limit;

    $total = count($activities);
    $activities = array_slice($activities, $offset, $limit);

    $next = $page + 1;
    $prev = $page - 1;

    return [
        "activities" => $activities,
        "pages" => [
            "next" => $next * $limit < $total ? "/city_exployer_api.php/activities.json?page=$next" : null,
            "prev" => $prev > 0 ? "/city_exployer_api.php/activities.json?page=$prev" : null
        ]
    ];
}

function createImage($text) {
    $text = trim((string) $text);
    $text = $text !== '' ? $text : 'City Event';

    if (function_exists('imagecreatetruecolor')) {
        $img = imagecreatetruecolor(300, 300);
        $bg = imagecolorallocate($img, rand(100, 255), rand(100, 255), rand(100, 255));
        imagefill($img, 0, 0, $bg);

        $color = imagecolorallocate($img, 0, 0, 0);
        imagestring($img, 5, 20, 140, substr($text, 0, 22), $color);

        header("Content-Type: image/png");
        imagepng($img);
        imagedestroy($img);
        return;
    }

    $palette = [
        ['#f7c873', '#f28b50'],
        ['#7dd3fc', '#38bdf8'],
        ['#86efac', '#4ade80'],
        ['#c4b5fd', '#8b5cf6'],
        ['#f9a8d4', '#ec4899'],
    ];
    $colors = $palette[array_rand($palette)];
    $safeText = htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

    header("Content-Type: image/svg+xml");
    echo <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300" role="img" aria-label="{$safeText}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{$colors[0]}" />
      <stop offset="100%" stop-color="{$colors[1]}" />
    </linearGradient>
  </defs>
  <rect width="300" height="300" rx="24" fill="url(#bg)" />
  <rect x="18" y="18" width="264" height="264" rx="18" fill="rgba(255,255,255,0.18)" />
  <text x="150" y="150" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#111827">
    {$safeText}
  </text>
</svg>
SVG;
}
