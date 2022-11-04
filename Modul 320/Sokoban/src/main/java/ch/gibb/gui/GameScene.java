package ch.gibb.gui;

import ch.gibb.common.Initializable;
import ch.gibb.common.Navigator;
import ch.gibb.game.Direction;
import ch.gibb.game.GameEndHandler;
import ch.gibb.game.Images;
import ch.gibb.model.DataAccess;
import ch.gibb.model.Level;
import javafx.scene.input.KeyEvent;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

/**
 * The GameScene is there where the real game happens. You will land here when you press space in the introduction scene
 *
 * @author Maurice Däppen
 */
public class GameScene extends BaseScene implements Initializable {

    /**
     * Sets a background image
     *
     * @param navigator takes a navigator for the super-constructor
     */
    public GameScene(Navigator<SceneType> navigator) {
        super(navigator, Images.GAME_BACKGROUND);
    }

    /**
     * the number of level which the user is playing. Is used to take the right out ob the level array
     */
    private int levelNumber;

    /**
     * All will bi initialized in this variable
     */
    private List<Level> levels;

    /**
     * Is used to check if the Game has ended
     */
    private final GameEndHandler gameEndHandler = new GameEndHandler();


    /**
     * in this method will the keyevents determined,the levels will be loaded & level 1 will be drawn on the canvas
     */
    @Override
    public void onInitialize() {
        this.setOnKeyPressed(this::handleKEyEvent);

        DataAccess dataAccess = new DataAccess();
        try {
            dataAccess.loadLevels();
        } catch (URISyntaxException | IOException e) {
            throw new RuntimeException(e);
        }
        levels = dataAccess.getLevels();
        levelNumber = 1;
        levels.get(0).draw(canvas.getGraphicsContext2D());
    }

    /**
     * This Method will be called when a Key got pressed.
     * For Some Keys is an action defined which will be run if the right key is pressed.
     *
     * @param e is a key event which is used for select which action will be done
     */
    private void handleKEyEvent(KeyEvent e) {
        switch (e.getCode()) {
            case A -> {
                levels.get(levelNumber - 1).update(Direction.LEFT);
                levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
            }
            case D -> {
                levels.get(levelNumber - 1).update(Direction.RIGHT);
                levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
            }
            case W -> {
                levels.get(levelNumber - 1).update(Direction.UP);
                levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
            }
            case S -> {
                levels.get(levelNumber - 1).update(Direction.DOWN);
                levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
            }
            case LEFT -> {
                if (levelNumber != 1) {
                    levels.get(levelNumber - 1).reset();
                    levelNumber--;
                    levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
                }
            }
            case RIGHT -> {
                if (levelNumber != levels.size()) {
                    levels.get(levelNumber - 1).reset();
                    levelNumber++;
                    levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
                }
            }
            case BACK_SPACE -> {
                levels.get(levelNumber - 1).reset();
                levels.get(levelNumber - 1).draw(canvas.getGraphicsContext2D());
            }
        }
        if (gameEndHandler.handle(levels.get(levelNumber - 1).getMovableObjects(), levels.get(levelNumber - 1).getBackgroundObjects())){
            navigator.goTo(SceneType.GAME_OVER);
        }


    }
}
