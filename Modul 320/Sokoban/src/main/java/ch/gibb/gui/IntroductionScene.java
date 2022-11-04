package ch.gibb.gui;


import ch.gibb.common.Navigator;
import ch.gibb.game.Images;
import javafx.scene.input.KeyCode;

/**
 * When you press space on the start scene, you will land here
 * here can you read instructions for the game
 *
 * @author Maurice Däppen
 */
public class IntroductionScene extends BaseScene {

    /**
     * Sets a background image & keyevent handler which moves to the next scene
     *
     * @param navigator takes a navigator for the super-constructor
     */
    public IntroductionScene(Navigator<SceneType> navigator) {
        super(navigator, Images.INTRODUCTION_BACKGROUND);
        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.SPACE) {
                navigator.goTo(SceneType.GAME);
            }
        });

    }
}
