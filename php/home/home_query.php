<?php
// TWEET
function send_tweet($user, $content){
    return " INSERT INTO post (id_user, content)
             VALUES (\"".$user."\", \"".$content."\")";
}

// LIKES
function check_likes($user, $post){
    return "SELECT id_user, id_post 
            FROM likes 
            WHERE id_user = \"".$user."\" AND id_post = \"".$post."\"";
}
function del_like($user, $post){
    return "DELETE FROM likes 
            WHERE id_user = \"".$user."\" AND id_post = \"".$post."\";";
}
function add_like($user, $post){
    return "INSERT INTO likes (id_user, id_post)
            VALUES (\"$user\", \"".$post."\");";
}

// RETWEET
function check_retweet($user, $post){
    return "SELECT id_user, id_post, users.username
            FROM retweet
            INNER JOIN users ON users.id = retweet.id_user 
            WHERE id_user = \"".$user."\" AND id_post = \"".$post."\";";
}
function del_retweet($user, $post){
    return "DELETE FROM retweet 
            WHERE id_user = \"".$user."\" AND id_post = \"".$post."\";";
}
function add_retweet($user, $post){
    return "INSERT INTO retweet (id_user, id_post)
            VALUES (\"$user\", \"".$post."\");";
}

// COMMMENT 
function send_comment($user, $post, $content){
    return "INSERT INTO comments (id_post, id_user, content) VALUES ('$post', '$user', '$content');";
}
function get_last_com($post, $user){
    return "SELECT 
                comments.id,
                comments.id_post, 
                comments.content,
                comments.creation_date, 
                users.username 
            FROM comments 
            INNER JOIN users ON comments.id_user = users.id 
            WHERE comments.id_post ='$post' AND comments.id_user = '$user' 
            ORDER BY creation_date DESC 
            LIMIT 1;";
}

// PRINT
function print_tweet(){
    return "SELECT
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
}
function print_comment(){
    return "SELECT  comments.id, 
                    comments.id_post, 
                    comments.id_user as 'user_com', 
                    comments.content, 
                    comments.creation_date, 
                    username 
            FROM comments 
            INNER JOIN users on users.id = comments.id_user
            ORDER BY creation_date DESC;";
}
function print_rt(){
    return "SELECT * FROM retweet ORDER BY retweet.creation_date DESC;";
}

// CHECK
function check_user_id($username){
    return "SELECT id FROM users WHERE users.username = \"$username\";";
}

// DELETE 
function del_com($id_user, $com){
    return "DELETE FROM comments WHERE id_user = '$id_user' AND id= '$com'";
}
function del_tweet($id){
    return "DELETE FROM comments WHERE comments.id_post = '$id';
    DELETE FROM comments WHERE comments.id_post = '$id';
    DELETE FROM media WHERE media.id_post = '$id';
    DELETE FROM retweet WHERE retweet.id_post = '$id';
    DELETE FROM post WHERE post.id = '$id';";
}

// UPDATE
function com_update($id, $content){
    return "UPDATE comments 
            SET comments.content = '$content'
            WHERE comments.id = '$id'";
}
function tweet_update($id, $content){
    return "UPDATE post 
            SET post.content = '$content'
            WHERE post.id = '$id'";
}

//username
function get_username($localStorage){
    return "SELECT username FROM users WHERE id=$localStorage";
}