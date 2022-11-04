package ch.gibb.game;

import ch.gibb.model.GameObject;
import ch.gibb.model.GameObjectType;
import ch.gibb.model.Level;

/**
 * Is used to check if the level has ended
 *
 * @author Maurice Däppen
 */
public class GameEndHandler {
    /**
     * Checks if every box stands on an endpoint
     *
     * @param movableObjects the array the with the current stand of the game
     * @param backgroundObjects the background objects to check
     * @return returns if the game has ended
     */
    public boolean handle(GameObject[][] movableObjects, GameObject[][] backgroundObjects) {
        boolean havenWon = true;
        for (GameObject[] line : movableObjects) {
            for (GameObject object : line) {
                if (object != null) {
                    if (object.getType() == GameObjectType.BOX) {
                        int[] position = object.getPosition();
                        if (backgroundObjects[position[1]][position[0]].getType() != GameObjectType.ENDPOINT) {
                            havenWon = false;
                        }
                    }
                }
            }
        }
        return havenWon;
    }

}
