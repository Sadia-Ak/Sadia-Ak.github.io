<?php
include('common.php');
display_header();
?>
    <?php
    $userName = $_POST["name"];// Retrieve the 'name' from the POST data sent from the form
    $userData = $userName;// Initialize a string 'userData' with the user's name to start building a CSV line
    // Loop through each key-value pair in the POST data
    foreach ($_POST as $key => $value) {
        // Check if the key is not 'name', since we've already added the name to 'userData'
        if ($key != "name") {
            // Append the value to 'userData', separated by a comma, to create a CSV format
            $userData = $userData.",".$value;
        }
    }
    // Append the 'userData' string to the 'singles.txt' file
    file_put_contents("singles.txt", "\n".$userData, FILE_APPEND);
    ?>

    <div>
    <h1>Thank you!</h1>
    <p>
    Welcome to NerdLuv, <?= $userName ?>!<br><br>
    Now <a href="matches.php">log in to see your matches!</a>
    </p>
    </div>
    
<?php
display_footer();
?>
    