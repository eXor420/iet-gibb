package ch.gibb.gui;

import ch.gibb.common.Navigator;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;

/**
 * Is the parent-class for every scene in this project
 *
 * @author Maurice Däppen
 */
public abstract class BaseScene extends Scene {

    /**
     * Scene-navigator to Navigate to another scene
     */
    protected final Navigator<SceneType> navigator;

    /**
     * The canvas where all the game-objects will be drawn on
     */
    protected final Canvas canvas;

    /**
     * The Super constructor which gives the Canvas a fix height and width
     * @param navigator will provide a navigator for every scene
     */
    public BaseScene(Navigator<SceneType> navigator) {
        super(new Group());
        this.navigator = navigator;
        canvas = new Canvas(800, 600);
        ((Group) getRoot()).getChildren().add(canvas);
    }

    /**
     * The Super constructor which does the same as the above but draws a background on the canvas
     * @param navigator will provide a navigator for every scene
     * @param backgroundImage takes an Image to draw on the canvas
     */
    public BaseScene(Navigator<SceneType> navigator, Image backgroundImage) {
        this(navigator);
        drawBackgroundImage(backgroundImage);
    }

    /**
     * Draw the background image on the canvas
     * @param backgroundImage will provide a navigator for every scene
     */
    private void drawBackgroundImage(Image backgroundImage) {
        GraphicsContext gc = canvas.getGraphicsContext2D();
        gc.drawImage(backgroundImage, 0, 0);
    }
}
