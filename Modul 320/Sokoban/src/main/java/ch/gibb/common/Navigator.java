package ch.gibb.common;

import javafx.scene.Scene;
import javafx.stage.Stage;

import java.util.HashMap;
import java.util.Map;

/**
 * The Scene Navigator is used to switch between the Scenes
 *
 * @author Maurice Däppen
 */
public class Navigator<T> {

    /**
     * The Stage which a scene can be applied to
     */
    private final Stage stage;

    /**
     * The Collection which contains all registered Scenes
     */
    private final Map<T, Scene> viewMap = new HashMap<>();

    /**
     * Sets the stage
     *
     * @param stage
     */
    public Navigator(Stage stage) {
        this.stage = stage;
    }

    /**
     * With this method you are able to register a new Scene where you can navigate to
     *
     * @param enumScene says which type of Scene the Registered scene is.
     * @param scene the scene which gets registered
     */
    public void registerScene(T enumScene, Scene scene) {
        viewMap.put(enumScene, scene);
    }

    /**
     * Is used to switch between the Scenes
     *
     * @param scene the scene which you want to switch to
     */
    public void goTo(T scene) {
        Scene activeScene = viewMap.get(scene);
        if (activeScene instanceof Initializable) {
            ((Initializable) activeScene).onInitialize();
        }
        stage.setScene(activeScene);
    }
}
