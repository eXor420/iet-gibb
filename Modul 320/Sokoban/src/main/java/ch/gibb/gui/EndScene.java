package ch.gibb.gui;


import ch.gibb.common.Navigator;
import ch.gibb.game.Images;
import javafx.scene.input.KeyCode;

/**
 * You will land here when you complete a level
 *
 * @author Maurice Däppen
 */
public class EndScene extends BaseScene {

    /**
     * Sets a background image & keyevent handler which moves to the next scene
     *
     * @param navigator takes a navigator for the super-constructor
     */
    public EndScene(Navigator<SceneType> navigator) {
        super(navigator, Images.END_BACKGROUND);
        setOnKeyPressed(e -> {
            if (e.getCode() == KeyCode.SPACE) {
                navigator.goTo(SceneType.GAME);
            }
        });

    }
}
