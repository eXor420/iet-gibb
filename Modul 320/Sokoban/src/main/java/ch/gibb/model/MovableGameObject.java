package ch.gibb.model;

/**
 * Object which will move in the game
 *
 * @author Maurice Däppen
 */
public class MovableGameObject extends GameObject {

    /**
     * For the Super constructor
     *
     * @param positionX the x coordinate of the field
     * @param positionY the x coordinate of the field
     * @param type      determines if the object is a box or player
     */
    public MovableGameObject(int positionX, int positionY, GameObjectType type) {
        super(positionX, positionY, type);
    }
}
