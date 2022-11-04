package ch.gibb.gui;


import ch.gibb.common.Navigator;
import ch.gibb.game.Images;
import javafx.scene.input.KeyCode;

/**
 * When you start the game, you will land here
 *
 * @author Maurice Däppen
 */
public class StartScene extends BaseScene {

    /**
     * Sets a background image & keyevent handler which moves to the next scene
     *
     * @param navigator takes a navigator for the super-constructor
     */
    public StartScene(Navigator<SceneType> navigator) {
        super(navigator, Images.START_BACKGROUND);
        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.SPACE) {
                navigator.goTo(SceneType.INTRODUCTION);
            }
        });

    }
}
