<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="15"/> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="../script/ajax/tweet_ajax.js" defer></script>
    <script src="../script/home.js" defer></script>
    <link rel="stylesheet" href="../style/home.css">
    <link rel="icon" href="../img/favicon.ico">
    <title>Home</title>
</head>
<body class="flex">
    <nav>
        <ul>
            <li><a href="./home.php">Home</a></li>
            <li><a href="">Messages</a></li>
            <li><a href="" id="profile">Profile</a></li>
        </ul>
    </nav>
    <main class="grid grid-cols-2">
        <div>
            <h2>Home</h2>
            <div>
                <form id="form_tweet">
                    <div id="img-container" class="flex flex-wrap"></div>
                    <div placeholder="Type something..." contenteditable="true" id="tweet" data-placeholder="What's happening?"></div>
                    <div class="grid grid-cols-3" id="option">
                        <div>
                            <label for="files"><img src="../img/upload_img.png" alt="icone upload"></label>
                            <input type="file" name="file" id="files" multiple="multiple" accept=".png, .jpg, .jpeg" max="5">
                        </div> 
                        <div></div>
                        <div>
                            <button class="btn-tweet">Tweet</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="text-center" id="POST"></div>
        </div>
        <div>
            <div>
                <div id="search">
                    <input type="text" placeholder="Search" id="search_input">
                </div>
                <div id="result_search"></div>
            </div>
            <div id="print_rt">

            </div>
        </div>
    </main>
</body>
</html>