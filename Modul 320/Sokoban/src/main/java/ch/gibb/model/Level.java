package ch.gibb.model;

import ch.gibb.game.Direction;
import ch.gibb.game.Images;
import ch.gibb.game.PlayerMovementHandler;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * The level with background objects and movable objects
 *
 * @author Maurice Däppen
 */
public class Level {

    /**
     * The only constructor because backgroundObjects & movableObjects are required
     *
     * @param backgroundObjects the background of the level
     * @param movableObjects    the boxes and the player
     */
    public Level(GameObject[][] backgroundObjects, GameObject[][] movableObjects) {
        this.backgroundObjects = backgroundObjects;
        this.movableObjectsAtStart = cloneLevel(movableObjects);
        this.movableObjects = movableObjects;
        this.playerMovementHandler = new PlayerMovementHandler(backgroundObjects);
    }


    /**
     * The background of the level
     */
    private final GameObject[][] backgroundObjects;

    /**
     * The start position of the player and the boxes
     */
    private final GameObject[][] movableObjectsAtStart;

    /**
     * The boxes and the player
     */
    private GameObject[][] movableObjects;

    /**
     * For handling the player movement
     */
    private final PlayerMovementHandler playerMovementHandler;

    /**
     * Draw the background objects and the movable objects on it
     *
     * @param gc the method requires a GraphicsContext to draw the level
     */
    public void draw(GraphicsContext gc) {
        gc.drawImage(Images.GAME_BACKGROUND, 0, 0);
        int fieldSide;
        if (600 / backgroundObjects.length > 800 / backgroundObjects[1].length) {
            fieldSide = (int) Math.floor(800.0 / backgroundObjects[1].length);
        } else {
            fieldSide = (int) Math.floor(600.0 / backgroundObjects.length);
        }
        int x;
        int y = 0;

        for (GameObject[] line : backgroundObjects) {
            x = 0;
            for (GameObject field : line) {
                switch (field.getType()) {
                    case BORDER -> gc.setFill(Color.BROWN);
                    case ENDPOINT, CLEAR -> gc.setFill(Color.BEIGE);
                }
                gc.fillRect(x, y, fieldSide, fieldSide);
                if (field.getType().equals(GameObjectType.ENDPOINT)) {
                    gc.setFill(Color.RED);
                    gc.fillOval(x + (fieldSide / 4.0), y + (fieldSide / 4.0), fieldSide / 2.0, fieldSide / 2.0);
                }
                x += fieldSide;
            }
            y += fieldSide;

        }
        y = 0;
        for (GameObject[] line : movableObjects) {
            x = 0;
            for (GameObject object : line) {
                if (object != null) {
                    switch (object.getType()) {
                        case BOX -> {
                            gc.setFill(Color.SANDYBROWN);
                            gc.fillRect(x, y, fieldSide, fieldSide);
                        }
                        case PLAYER -> {
                            gc.setFill(Color.GREEN);
                            gc.fillOval(x, y, fieldSide, fieldSide);
                        }
                    }
                }
                x += fieldSide;
            }
            y += fieldSide;
        }


    }

    /**
     * Updates the level when a key is pressed
     *
     * @param direction determines in which direction the player moved
     */
    public void update(Direction direction) {
        GameObject player = new GameObject(0, 0, GameObjectType.PLAYER);
        for (GameObject[] line : movableObjects) {
            for (GameObject object : line) {
                if (object != null) {
                    if (object.getType().equals(GameObjectType.PLAYER)) {
                        player = object;
                    }
                }
            }
        }
        switch (direction) {
            case LEFT -> {
                movableObjects = playerMovementHandler.handleMoveLeft(player.getPosition(), movableObjects, player);
            }
            case RIGHT -> {
                movableObjects = playerMovementHandler.handleMoveRight(player.getPosition(), movableObjects, player);
            }
            case UP -> {
                movableObjects = playerMovementHandler.handleMoveUp(player.getPosition(), movableObjects, player);
            }
            case DOWN -> {
                movableObjects = playerMovementHandler.handleMoveDown(player.getPosition(), movableObjects, player);
            }

        }

    }

    /**
     * Resets the level
     */
    public void reset() {
        movableObjects = cloneLevel(movableObjectsAtStart);
    }


    /**
     * Clones a level
     *
     * @param level the level which will be cloned
     * @return the cloned level
     */
    private GameObject[][] cloneLevel(GameObject[][] level) {
        GameObject[][] clonedLevel = new GameObject[level.length][level[0].length];
        int x = 0;
        int y;
        for (GameObject[] line : level) {
            GameObject[] clonedLine = new GameObject[level[0].length];
            y = 0;
            for (GameObject field : line) {
                if (field != null) {
                    GameObject clone = new GameObject(field.getPositionX(), field.getPositionY(), field.getType());
                    clonedLine[y] = clone;
                } else {
                    clonedLine[y] = null;
                }
                y++;
            }
            clonedLevel[x] = clonedLine;
            x++;
        }
        return clonedLevel;
    }

    /**
     * returns the background objects
     *
     * @return the background objects as 2d Array
     */
    public GameObject[][] getBackgroundObjects() {
        return backgroundObjects;
    }

    /**
     * returns the movable objects
     *
     * @return the movable objects as 2d Array
     */
    public GameObject[][] getMovableObjects() {
        return movableObjects;
    }

    /**
     * Prints a Level on the console
     */
    @Override
    public String toString() {

        StringBuilder output = new StringBuilder();
        int counter = 0;
        for (GameObject[] line : backgroundObjects) {
            for (GameObject field : line) {
                GameObject movableObject = movableObjects[field.getPositionY()][field.getPositionX()];
                if (movableObject == null) {
                    switch (field.getType()) {
                        case BORDER -> output.append("#");
                        case ENDPOINT -> output.append(".");
                        case CLEAR -> output.append(" ");
                    }
                } else {
                    GameObjectType movableObjectType = movableObject.getType();
                    GameObjectType backgroundObjectType = field.getType();
                    if (movableObjectType == GameObjectType.PLAYER) {
                        if (backgroundObjectType == GameObjectType.CLEAR) {
                            output.append("@");
                        } else {
                            output.append("+");
                        }

                    } else {
                        if (backgroundObjectType == GameObjectType.CLEAR) {
                            output.append("$");
                        } else {
                            output.append("*");
                        }

                    }

                }


            }
            counter++;
            if(backgroundObjects.length > counter){
                output.append("\n");
            }

        }

        return output.toString();
    }

}
