package ch.gibb.model;

/**
 * Object which won't move in the game
 *
 * @author Maurice Däppen
 */
public class StandableGameObject extends GameObject {

    /**
     * For the Super constructor
     *
     * @param positionX the x coordinate of the field
     * @param positionY the x coordinate of the field
     * @param type      determines if the object is an endpoint, wall, clear or something else...
     */
    public StandableGameObject(int positionX, int positionY, GameObjectType type) {
        super(positionX, positionY, type);
    }

}
