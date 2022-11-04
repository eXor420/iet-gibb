package ch.gibb.game;

import javafx.scene.image.Image;

/**
 * provides static images for the Game which are used to draw backgrounds
 *
 * @author Maurice Däppen
 */
public class Images {

    /**
     * Is an Image for the start-scene
     */
    public static final Image START_BACKGROUND = getImage("start_background.png");

    /**
     * Is an Image for the introduction-scene
     */
    public static final Image INTRODUCTION_BACKGROUND = getImage("introduction_background.png");

    /**
     * Is an Image for the game-scene(actual game)
     */
    public static final Image GAME_BACKGROUND = getImage("game_background.png");

    /**
     * Is an Image for the end-scene
     */

    public static final Image END_BACKGROUND = getImage("end_background.png");

    /**
     * takes the imageName and returns the image
     *
     * @param imgName is the image for the image to get
     * @return returns the Image
     */
    private static Image getImage(String imgName) {
        return new Image("/images/" + imgName);
    }
}
