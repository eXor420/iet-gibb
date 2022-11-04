package ch.gibb.game;

import ch.gibb.model.GameObject;
import ch.gibb.model.GameObjectType;

/**
 * Handles the player movement
 *
 * @author Maurice Däppen
 */
public class PlayerMovementHandler {

    /**
     * The background-objects of the Level which it is used for
     */
    private final GameObject[][] backgroundObjects;

    /**
     * The only Constructor for this class because it needs the background-objects to work
     *
     * @param backgroundObjects an array with the background witch stays all the time
     */
    public PlayerMovementHandler(GameObject[][] backgroundObjects) {
        this.backgroundObjects = backgroundObjects;
    }

    /**
     * Is called when the Player moves to left. It checks if the Player is able to move left, if so it moves the player to left. When there is a box it moves the box too.
     *
     * @param oldPosition    an array which contains the old ols position of the player
     * @param movableObjects the array the with the current stand of the game
     * @param player         the player object
     * @return returns the new stand of the game in form of a 3d array
     */
    public GameObject[][] handleMoveLeft(int[] oldPosition, GameObject[][] movableObjects, GameObject player) {
        if (getFieldType(oldPosition[1], oldPosition[0] - 1) != GameObjectType.BORDER) {

            if (getMovableGameObject(oldPosition[1], oldPosition[0] - 1, movableObjects) == null) {
                movableObjects[oldPosition[1]][oldPosition[0]] = null;
                player.setPosition(oldPosition[0] - 1, oldPosition[1]);
                movableObjects[oldPosition[1]][oldPosition[0] - 1] = player;
            } else {
                if (getMovableGameObject(oldPosition[1], oldPosition[0] - 2, movableObjects) == null && getFieldType(oldPosition[1], oldPosition[0] - 2) != GameObjectType.BORDER) {
                    movableObjects = moveBox(Direction.LEFT, oldPosition[1], oldPosition[0] - 1, movableObjects);
                    movableObjects[oldPosition[1]][oldPosition[0]] = null;
                    player.setPosition(oldPosition[0] - 1, oldPosition[1]);
                    movableObjects[oldPosition[1]][oldPosition[0] - 1] = player;

                }
            }


        }
        return movableObjects;
    }

    /**
     * Is called when the Player moves to right. It checks if the Player is able to move left, if so it moves the player to right. When there is a box it moves the box too.
     *
     * @param oldPosition    an array which contains the old ols position of the player
     * @param movableObjects the array the with the current stand of the game
     * @param player         the player object
     * @return returns the new stand of the game in form of a 3d array
     */
    public GameObject[][] handleMoveRight(int[] oldPosition, GameObject[][] movableObjects, GameObject player) {
        if (getFieldType(oldPosition[1], oldPosition[0] + 1) != GameObjectType.BORDER) {
            if (getMovableGameObject(oldPosition[1], oldPosition[0] + 1, movableObjects) == null) {
                movableObjects[oldPosition[1]][oldPosition[0]] = null;
                player.setPosition(oldPosition[0] + 1, oldPosition[1]);
                movableObjects[oldPosition[1]][oldPosition[0] + 1] = player;
            } else {
                if (getMovableGameObject(oldPosition[1], oldPosition[0] + 2, movableObjects) == null && getFieldType(oldPosition[1], oldPosition[0] + 2) != GameObjectType.BORDER) {
                    movableObjects = moveBox(Direction.RIGHT, oldPosition[1], oldPosition[0] + 1, movableObjects);
                    movableObjects[oldPosition[1]][oldPosition[0]] = null;
                    player.setPosition(oldPosition[0] + 1, oldPosition[1]);
                    movableObjects[oldPosition[1]][oldPosition[0] + 1] = player;

                }
            }

        }
        return movableObjects;
    }

    /**
     * Is called when the Player moves up. It checks if the Player is able to move up, if so it moves the player up. When there is a box it moves the box too.
     *
     * @param oldPosition    an array which contains the old ols position of the player
     * @param movableObjects the array the with the current stand of the game
     * @param player         the player object
     * @return returns the new stand of the game in form of a 3d array
     */
    public GameObject[][] handleMoveUp(int[] oldPosition, GameObject[][] movableObjects, GameObject player) {
        if (getFieldType(oldPosition[1] - 1, oldPosition[0]) != GameObjectType.BORDER) {
            if (getMovableGameObject(oldPosition[1] - 1, oldPosition[0], movableObjects) == null) {
                movableObjects[oldPosition[1]][oldPosition[0]] = null;
                player.setPosition(oldPosition[0], oldPosition[1] - 1);
                movableObjects[oldPosition[1] - 1][oldPosition[0]] = player;
            } else {
                if (getMovableGameObject(oldPosition[1] - 2, oldPosition[0], movableObjects) == null && getFieldType(oldPosition[1] - 2, oldPosition[0]) != GameObjectType.BORDER) {
                    movableObjects = moveBox(Direction.UP, oldPosition[1] - 1, oldPosition[0], movableObjects);
                    movableObjects[oldPosition[1]][oldPosition[0]] = null;
                    player.setPosition(oldPosition[0], oldPosition[1] - 1);
                    movableObjects[oldPosition[1] - 1][oldPosition[0]] = player;

                }
            }

        }
        return movableObjects;
    }

    /**
     * Is called when the Player moves down. It checks if the Player is able to move down, if so it moves the player down. When there is a box it moves the box too.
     *
     * @param oldPosition    an array which contains the old ols position of the player
     * @param movableObjects the array the with the current stand of the game
     * @param player         the player object
     * @return returns the new stand of the game in form of a 3d array
     */
    public GameObject[][] handleMoveDown(int[] oldPosition, GameObject[][] movableObjects, GameObject player) {
        if (getFieldType(oldPosition[1] + 1, oldPosition[0]) != GameObjectType.BORDER) {
            if (getMovableGameObject(oldPosition[1] + 1, oldPosition[0], movableObjects) == null) {
                movableObjects[oldPosition[1]][oldPosition[0]] = null;
                player.setPosition(oldPosition[0], oldPosition[1] + 1);
                movableObjects[oldPosition[1] + 1][oldPosition[0]] = player;
            } else {
                if (getMovableGameObject(oldPosition[1] + 2, oldPosition[0], movableObjects) == null && getFieldType(oldPosition[1] + 2, oldPosition[0]) != GameObjectType.BORDER) {
                    movableObjects = moveBox(Direction.DOWN, oldPosition[1] + 1, oldPosition[0], movableObjects);
                    movableObjects[oldPosition[1]][oldPosition[0]] = null;
                    player.setPosition(oldPosition[0], oldPosition[1] + 1);
                    movableObjects[oldPosition[1] + 1][oldPosition[0]] = player;


                }
            }

        }
        return movableObjects;
    }

    /**
     * get the type of the field by coordinates
     *
     * @param lineCord index of the line you want to get the type
     * @param charCord index of the char in the line you want to get the type
     * @return the type of the field by the given coordinates
     */
    public GameObjectType getFieldType(int lineCord, int charCord) {
        return backgroundObjects[lineCord][charCord].getType();

    }

    /**
     * Get a movable game-object by the coordinates out of an array
     *
     * @param lineCord       index of the line you want to get the object
     * @param charCord       index of the char in the line you want to get the object
     * @param movableObjects the array from which you want to get the object
     * @return returns the object by the given coordinates
     */
    public GameObject getMovableGameObject(int lineCord, int charCord, GameObject[][] movableObjects) {
        return movableObjects[lineCord][charCord];

    }

    /**
     * is called when the player moves a box, and it moves the right box
     *
     * @param direction      index of the line you want to get the object
     * @param lineCord       index of the line you want to get the object
     * @param charCord       index of the char in the line you want to get the object
     * @param movableObjects the array where the box is moved
     * @return returns the new stand of the game in form of a 3d array
     */
    public GameObject[][] moveBox(Direction direction, int lineCord, int charCord, GameObject[][] movableObjects) {
        GameObject boxToMove = movableObjects[lineCord][charCord];
        movableObjects[lineCord][charCord] = null;
        switch (direction) {
            case LEFT -> {
                boxToMove.setPosition(charCord - 1, lineCord);
                movableObjects[lineCord][charCord - 1] = boxToMove;

            }
            case RIGHT -> {
                boxToMove.setPosition(charCord + 1, lineCord);
                movableObjects[lineCord][charCord + 1] = boxToMove;

            }
            case UP -> {
                boxToMove.setPosition(charCord, lineCord - 1);
                movableObjects[lineCord - 1][charCord] = boxToMove;

            }
            case DOWN -> {
                boxToMove.setPosition(charCord, lineCord + 1);
                movableObjects[lineCord + 1][charCord] = boxToMove;

            }

        }
        return movableObjects;
    }

}
