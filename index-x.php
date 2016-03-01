<?php
$dir = 'images/bkgds/';
$images = array();

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if (is_file($dir.$file)) {
                $images[] = $dir.$file;
            }
//            echo "filename: $file : filetype: " . filetype($dir . $file) . "\n";
            }
        closedir($dh);
    }
}

$i = rand(0, count($images)-1); // generate a random array
$myRandBkgd = $images[$i]; // set variable equal to which random filename was chosen

?>

<doctype html>
<html>
<head>
    <style>
        body { background: transparent url(<?php echo $myRandBkgd; ?>) center top; }
    	div { color:white; width:400px; margin: 20px auto; padding:20px; background-color:black; }
    </style>
    <script src="jquery-min.js"></script>
    <script>
        $(function() {
            // To get to:
            // if url param for bkgd, use it for bkgd; otherwise, use rotator php script

            // Tabbed Behavior
            $('.content-container').hide();
            $('#content-home').show();



        });
    </script>
</head>
<body>

    <div id="tabbed-container">
        <ul>
            <li><a href="#home" id="home">Home</a></li>
            <li><a href="#about" id="about">About</a></li>
            <li><a href="#contact" id="contact">Contact</a></li>
            <li><a href="#gallery" id="gallery">Gallery</a></li>
        </ul>

        <div class="content-container" id="content-home">
            <a href="#about"><img src="images/rscard_01.jpg"/></a>
        </div>

        <div class="content-container" id="content-about">
            <h1>Reelsounds</h1>
            <h2>A world class analog and digital recording studio in Chicago, IL</h2>

            <p>Reelsounds Chicago opened in 1995 with the sole mission to create the most comfortable quarters for musicians and engineers to make music. The studio is centered on the equipment that was used to make the classic recordings. Digital friendly, but with an analog heart, Reelsounds is the sultry collision of present and past.</p>

            <p>The spacious yet cozy interior is modeled on the feel of America's classic recording studios, and affords clients the opportunity to capitalize on the energy and inspiration that only comes from locking in and playing as a unit. While the facility specializes in capturing basic tracks for bands, it also accommodates solo recordings, overdubs, and mixing with a "big room" touch.</p>

            <p>See the photo gallery >></p>

            <p>Contact us >></p>
        </div>


        <div class="content-container" id="content-contact">
            SOME FORM HERE for CONTACT
        </div>
        

        <div class="content-container" id="content-gallery">
            NEED TO DO SOME FANCY STUFF FOR GALLERY
        </div>
    </div>

</body>
</html>