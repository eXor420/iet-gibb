package ch.gibb.main;

import ch.gibb.common.Navigator;
import ch.gibb.gui.*;
import javafx.application.Application;
import javafx.stage.Stage;

/**
 * This is basically the real app.
 *
 * @author Maurice Däppen
 */
public class SokobanApp extends Application {

    /**
     * Overrides the start method from Application. In this method will the stage been configured and the scene will be registered.
     */
    @Override
    public void start(Stage stage) {
        stage.setTitle("Sokoban");
        stage.setResizable(false);
        Navigator<SceneType> navigator = new Navigator<>(stage);
        navigator.registerScene(SceneType.START, new StartScene(navigator));
        navigator.registerScene(SceneType.INTRODUCTION, new IntroductionScene(navigator));
        navigator.registerScene(SceneType.GAME, new GameScene(navigator));
        navigator.registerScene(SceneType.GAME_OVER, new EndScene(navigator));


        navigator.goTo(SceneType.START);

        stage.show();
    }
}