<?php
include('common.php');
display_header();
?>
    <?php
    // Retrieve the username from the GET request and sanitize it.
    $username = trim($_GET["name"]);
    /**
     * Searches for the user's match details in the given data lines.
     * @param string $username The username to search for.
     * @param array $lines The lines of user data to search through.
     * @return array An array of the user's details or an empty array if not found.
     */
    function findMatches($username, $lines) {
        // Loop through each line of user data
        foreach ($lines as $line) {
            // Split the line into user attributes using a comma as the separator
            list($name, $gender, $age, $personality, $os, $minAge, $maxAge) = explode(",", $line);
            // Check if the current line's username matches the given username
            if ($name == $username) {
                // Return the user's details in an array if a match is found
                return array($gender, $age, $personality, $os, $minAge, $maxAge);
            }
        }
        // Return an empty array if no matching user is found
        return [];
    }
    /**
     * Displays potential matches for the user based on their details.
     * @param array $userDetails The user's own details for matching.
     * @param array $lines The lines of potential match data.
     */
    function displayMatches($userDetails, $lines) {
        // Extract the user's own details for matching with others
        list($gender, $age, $personality, $os, $minAge, $maxAge) = $userDetails;
        // Loop through each line of potential match data
        foreach ($lines as $line) {
            // Split the line into attributes for the potential match
            list($name, $gender2, $age2, $personality2, $os2, $min2, $max2) = explode(",", $line);
            // Check if potential match's age is within the user's acceptable age range
            $ageCheck = $age2 >= $minAge && $age2 <= $maxAge;
            // Check if the user's age is within the potential match's acceptable age range
            $ageRangeCheck = $min2 <= $age && $max2 >= $age;
            // Check for any similarity in personality type
            $personalityCheck = similar_text($personality2, $personality) > 0;
            
            // If all matching criteria are met, then it's a potential match
            if ($gender2 != $gender && $ageCheck && $ageRangeCheck && $personalityCheck && $os == $os2) {
                ?>
                <div class='match'>
                    <p><?= $name ?></p>
                    <img src='user.jpg' alt='User'>
                    <ul>
                        <li><strong>gender:</strong> <?= $gender2 ?></li>
                        <li><strong>age:</strong> <?= $age2 ?></li>
                        <li><strong>type:</strong> <?= $personality2 ?></li>
                        <li><strong>OS:</strong> <?= $os2 ?></li>
                    </ul>
                </div>
                <?php
            }
        }
    }
    // Read user data from a file.
    $lines = file("singles.txt", FILE_IGNORE_NEW_LINES);
    $userDetails = findMatches($username, $lines);

    // Display matches or a message if no matches are found.
    if (!empty($userDetails)) {
        ?>
        <h1>Matches for <?= $username ?></h1>
        <?php
        displayMatches($userDetails, $lines);
    } else {
        ?><h1>No matches found for <?= $username ?></h1>
        <?php
    }
    ?>

<?php
display_footer();
?>
