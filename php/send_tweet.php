<?php
    @include("db_connect.php");

    $data = json_decode($_POST["data"]);

    $command = "INSERT INTO post (id_user, content)
                VALUES (\"5\", \"".$data->content."\")";


    $command_print = "  SELECT
                        users.username,
                        post.*,
                        media.base64 as 'base64',
                        (SELECT count(retweet.id_post) from retweet WHERE retweet.id_post = post.id) as 'nbr_rt',  
                        (SELECT count(likes.id_post) from likes WHERE likes.id_post = post.id) as 'nbr_likes',  
                        count(comments.id_post) as 'nbr_com'
                    FROM post

                    LEFT JOIN users on users.id = post.id_user
                    LEFT JOIN media on media.id_post = post.id
                    LEFT JOIN comments on comments.id_post = post.id

                    GROUP BY post.id

                    ORDER BY post.creation_date DESC;";

    $command_comment = "SELECT
                            comments.*,
                            username
                        FROM comments

                        INNER JOIN users on users.id = comments.id_user

                        ORDER BY id_post DESC";
    $encode = [];
    try {
        // $sth = $pdo->query($command);

        $sth_print = $pdo->query($command_print);
        $sth_print = $sth_print->fetchAll(PDO::FETCH_ASSOC);
        $encode[0] = $sth_print;

        $sth_com = $pdo->query($command_comment);
        $sth_com = $sth_com->fetchAll(PDO::FETCH_ASSOC);
        $encode[1] = $sth_com;

        print_r(json_encode($encode));

    } catch (Exception $e) {
        echo $e->getMessage();
    }
