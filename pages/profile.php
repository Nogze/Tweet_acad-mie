<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../script/ajax/edit_profile-info.js"></script>
    <script src="../script/profile.js"></script>
    <link rel="icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../style/profile.css">
    <title>Tweet Academie</title>
</head>

<body class="flex">
    <nav>
        <ul>
            <li><a href="./home.php">Home</a></li>
            <li><a href="./mesagerie.php">Messages</a></li>
            <li><a href="" id="profile">Profile</a></li>
        </ul>
    </nav>
    <main class="grid grid-cols-2">
        <div class="main">
            <?php include("../php/gen_profile.php") ?>
        </div>
        <div>
            <div id="search">
                <input type="text" placeholder="Search" id="search_input">
            </div>
        </div>
    </main>
</body>

</html>